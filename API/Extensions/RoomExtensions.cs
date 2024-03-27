using API.Models;
using API.Models.DTOs.Child;
using API.Models.DTOs.Room;

namespace API.Extensions
{
    public static class RoomExtensions
    {
        public static CreatedRoomDTO MapCreatedRoomToDTO(this Room room)
        {
            return new CreatedRoomDTO()
            {
                CreatedAt = room.CreatedAt,
                Name = room.Name,
                InvitationCode = room.InvitationCode,
                CreatedBy = room.CreatedById
            };
        }

        public static GetRoomDTO MapRoomToDTO(this Room room)
        {
            return new GetRoomDTO()
            {
                Id = room.Id,
                CreatedAt = room.CreatedAt,
                Name = room.Name,
                InvitationCode = room.InvitationCode,
                CreatedBy = room.CreatedById,
                Children = room.Children.Select(x => new GetChildDTO()
                {
                    Id = x.Id,
                    Username = x.Username,
                    Name = x.Name,
                    Class = x.Class,

                }).ToList(),
                Tasks = room.Tasks.Select(x => x.MapTaskToDTO()).ToList()
            };
        }

        public static GetDetailedRoomDTO MapDetailedRoomToDTO(this RoomDetailed room)
        {
            return new GetDetailedRoomDTO()
            {
                Id = room.Id,
                CreatedAt = room.CreatedAt,
                Name = room.Name,
                InvitationCode = room.InvitationCode,
                CreatorName = room.CreatorName,
                CreatorSurname = room.CreatorSurname
            };
        }
    }
}
