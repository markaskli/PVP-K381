using API.Models.DTOs.Child;
using Supabase.Gotrue;

namespace API.Services.ChildService
{
    public interface IChildService
    {
        Task<GetChildDTO> GetChildInformation(string token);
        Task<List<GetChildOfParentDTO>> GetChildrenOfParent(string parentId);
        Task<Session> Register(ChildRegistrationDTO request);
    }
}