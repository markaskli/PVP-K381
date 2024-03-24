using API.Models.DTOs.Room;

namespace API.Services.RoomService
{
    public interface IRoomService
    {
        Task<CreatedRoomDTO?> CreateRoomAsync(string token);
        Task<bool> DeleteRoomByIdAsync(string roomId);
        Task<GetRoomDTO> GetRoomById(string id);
        Task<List<GetDetailedRoomDTO>?> GetRoomsByChildIdAsync(string userToken);
        Task<List<GetRoomDTO>?> GetRoomsByCreatorIdAsync(string userToken);
        Task<bool> JoinRoomAsync(string userToken, string invitationCode);
        Task<bool> RemoveChildFromRoomAsync(RemoveChildFromRoomDTO request);
    }
}