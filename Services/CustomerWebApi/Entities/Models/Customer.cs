using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CustomerWebApi.Entities.Models
{
        [Table("Customer")]
        public class Customer
        {
            [Column("CustomerId")]
            public int Id { get; set; }

            [Required(ErrorMessage = "First Name is required")]
            [StringLength(60, ErrorMessage = "First Name can't be longer than 60 characters")]
            public string? FirstName { get; set; }
            [Required(ErrorMessage = "Last Name is required")]
            [StringLength(60, ErrorMessage = "Last Name can't be longer than 60 characters")]
            public string? LastName { get; set; }

            [Required(ErrorMessage = "Email is required")]
            public string? Email { get; set; }

            public DateTime Created { get; set; }

            public DateTime? Updated { get; set; }
        }
    
}
