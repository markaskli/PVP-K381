using API.Models.DTOs.Child;
using Supabase.Gotrue;

namespace API.Services.ChildService
{
    public interface IChildService
    {
        Task<List<GetChildDTO>> GetChildrenOfParent(string parentId);
        Task<Session> Register(ChildRegistrationDTO request);
    }
}