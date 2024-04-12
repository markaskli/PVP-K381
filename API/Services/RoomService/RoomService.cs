using API.Extensions;
using API.Models;
using API.Models.DTOs.Room;
using API.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Postgrest.Exceptions;
using Supabase;
using Supabase.Gotrue;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace API.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly Supabase.Client _supabaseClient;

        public RoomService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<CreatedRoomDTO?> CreateRoomAsync(string token, CreateRoom request)
        {

            var creator = await _supabaseClient.Auth.GetUser(token);
            if (creator == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }

            string invitationCode = RandomGenerator.GenerateRandomString(Utils.Constants.RoomInvitationCodeLength);

            var existingCodesInDatabase = await _supabaseClient.From<Room>()
                .Select(x => new object[] { x.InvitationCode })
                .Get();

            if (existingCodesInDatabase != null && existingCodesInDatabase.Content != null)
            {
                var existingCodesParsed = JArray.Parse(existingCodesInDatabase.Content);
                bool codeExists = existingCodesParsed.Any(x => x["invitation_code"]?.ToString() == invitationCode);
                while (codeExists)
                {
                    invitationCode = RandomGenerator.GenerateRandomString(Utils.Constants.RoomInvitationCodeLength);
                    codeExists = existingCodesParsed.Any(x => x["invitation_code"]?.ToString() == invitationCode);
                }
            }


            var createdRoom = new Room()
            {
                CreatedAt = DateTime.Now.Date,
                CreatedById = creator.Id,
                Name = request.Name,
                InvitationCode = invitationCode
            };


            var result = await _supabaseClient.From<Room>().Insert(createdRoom);
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return result.Model.MapCreatedRoomToDTO();
            }

            return null;


        }

        public async Task<bool> JoinRoomAsync(string userToken, string invitationCode)
        {
            if (invitationCode.Length == 0 || userToken.Length == 0)
            {
                throw new ArgumentException("Invalid data provided.");
            }


            var room = await _supabaseClient.From<Room>()
                .Where(x => x.InvitationCode == invitationCode)
                .Single();

            if (room == null)
            {
                throw new KeyNotFoundException("No room was found that matches the provided code.");
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var childId = jwtTokenObject.Subject;

            var child = await _supabaseClient.From<Child>()
                .Where(x => x.Id == childId)
                .Single();

            if (child == null)
            {
                throw new ArgumentException("The user does not belong to the required role.");
            }

            var childRoom = new Dictionary<string, object>()
            {
                {"roomid", room.Id },
                {"childid", child.Id }
            };


            var result = await _supabaseClient.Rpc("add_child_to_room", childRoom);
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return true;
            }

            return false;

        }

        public async Task<GetRoomDTO> GetRoomById(string id)
        {
            var room = await _supabaseClient.From<Room>()
                .Where(x => x.Id == id)
                .Single();


            if (room == null)
            {
                throw new KeyNotFoundException("No room with specified id was found.");
            }

            return room.MapRoomToDTO();
        }

        public async Task<List<GetRoomDTO>?> GetRoomsByCreatorIdAsync(string userToken)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var creatorId = jwtTokenObject.Subject;

            var rooms = await _supabaseClient.From<Room>()
                .Where(x => x.CreatedById == creatorId)
                .Get();

            if (rooms != null && rooms.ResponseMessage.IsSuccessStatusCode)
            {
                return rooms.Models.Select(x => x.MapRoomToDTO()).ToList();

            }

            return null;

        }

        public async Task<List<GetDetailedRoomDTO>?> GetRoomsByChildIdAsync(string userToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var childId = jwtTokenObject.Subject;

            var childProps = new Dictionary<string, object>()
            {
                {"childid", childId }
            };

            var result = await _supabaseClient.Rpc("get_rooms_with_child", childProps);
            if (result.Content == null || result.Content.Length == 0)
            {
                return null;
            }

            List<RoomDetailed> rooms = JsonConvert.DeserializeObject<List<RoomDetailed>>(result.Content);

            return rooms.Select(x => x.MapDetailedRoomToDTO()).ToList();


        }

        public async Task<bool> DeleteRoomByIdAsync(string roomId)
        {
            var room = await _supabaseClient.From<Room>()
                .Where(x => x.Id == roomId)
                .Single();

            if (room == null)
            {
                return false;
            }

            await room.Delete<Room>();
            return true;
        }

        public async Task<bool> RemoveChildFromRoomAsync(string roomId, string childId)
        {
            if (string.IsNullOrEmpty(roomId) || string.IsNullOrEmpty(childId))
            {
                return false;
            }

            var deleteProps = new Dictionary<string, object>()
            {
                { "roomid", roomId },
                { "childid", childId },
            };

            var result = await _supabaseClient.Rpc("remove_child_from_room", deleteProps);
            if (result.ResponseMessage.IsSuccessStatusCode)
            {
                return true;
            }

            return false;
        }



    }
}
