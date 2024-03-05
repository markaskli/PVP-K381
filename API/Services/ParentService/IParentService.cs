using API.Models.DTOs.Parent;
using Supabase.Gotrue;

namespace API.Services.ParentService
{
    public interface IParentService
    {
        Task<Session?> SignUp(CreateParentDTO request);
        Task<User?> UpdateParentInformation(UpdateParentDTO request);
    }
}