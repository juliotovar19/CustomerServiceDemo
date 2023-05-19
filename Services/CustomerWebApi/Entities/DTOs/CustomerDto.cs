namespace CustomerWebApi.Entities.DTOs
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public string? Email { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}
