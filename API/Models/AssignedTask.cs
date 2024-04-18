using Postgrest.Attributes;
using Postgrest.Models;
using Supabase.Gotrue;

namespace API.Models
{
    [Table("assigned_tasks")]
    public class AssignedTask : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Reference(typeof(Task), useInnerJoin: true)]
        public Task Task { get; set; } 
        [Column("task_id")]
        public int TaskId { get; set; }
        [Reference(typeof(Child), useInnerJoin: true)]
        public Child Child { get; set; }
        [Column("child_id")]
        public string ChildId { get; set; } = null!;
        [Reference(typeof(Users), useInnerJoin: true)]
        public Users User { get; set; }
        [Column("assigned_by_id")]
        public string AssignedById { get; set; } = null!;
        [Column("is_confirmed_by_child")]
        public bool IsConfirmedByChild { get; set; }
        [Column("is_confirmed_by_user")]
        public bool IsConfirmedByUser{ get; set; }
        [Column("assigned_at")]
        public DateTime AssignedAt { get; set; }
        [Column("completed_at")]
        public DateTime? CompletedAt { get; set; }
        [Column("room_id")]
        public string? RoomId { get; set; }
        [Column("is_finished")]
        public bool IsFinished { get; set; } = false;

    }
}
