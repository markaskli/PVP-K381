using API.Models.DTOs.Child;
using API.Models.DTOs.Parent;
using Supabase.Gotrue;

namespace API.Services.ParentService
{
    public interface IParentService
    {
        Task<ChildRegistrationDataDTO?> RegisterChild(CreateInitialChildDTO request, string requestToken);
        Task<Session> SignUp(CreateParentDTO request);
    }
}