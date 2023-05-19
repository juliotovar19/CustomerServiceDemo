using CustomerWebApi.Entities.Models;
using CustomerWebApi.Paging;
using System.Linq.Expressions;

namespace CustomerWebApi.Contracts
{
    public interface ICustomerRepository: IRepositoryBase<Customer>
    {
        Task<PagedList<Customer>> GetAllCustomers(PagingParameters pagingParameters);
        Task<Customer> FindCustomerById(int customerId);
        void CreateCustomer(Customer entity);
        void UpdateCustomer(Customer entity);
        void DeleteCustomer(Customer entity);

    }
}
