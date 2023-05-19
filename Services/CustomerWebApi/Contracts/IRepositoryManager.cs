namespace CustomerWebApi.Contracts
{
    public interface IRepositoryManager
    {
        ICustomerRepository Customer { get; }
        Task SaveAsync();

    }
}
