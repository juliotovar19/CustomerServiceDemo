using System.ComponentModel.DataAnnotations;

namespace CustomerWebApi.Entities.DTOs
{
    public class CustomerForUpdateDto
    {
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(60, ErrorMessage = "First Name can't be longer than 60 characters")]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(60, ErrorMessage = "Last Name can't be longer than 60 characters")]
        public string? LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Updated date is required")]
        public DateTime Updated { get; set; }
    }
}
