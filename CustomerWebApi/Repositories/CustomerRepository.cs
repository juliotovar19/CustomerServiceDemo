using CustomerWebApi.Contracts;
using CustomerWebApi.Entities;
using CustomerWebApi.Entities.Models;
using CustomerWebApi.Paging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CustomerWebApi.Repositories
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationContext applicationContext) : base(applicationContext)
        {
        }

        public async Task<PagedList<Customer>> GetAllCustomers(PagingParameters pagingParameters)
        {
            return await Task.FromResult(PagedList<Customer>.GetPagedList(FindAll().OrderBy(c => c.Id), pagingParameters.PageNumber, pagingParameters.PageSize));
        }
        public async Task<Customer> FindCustomerById(int customerId)
        {
            return  await FindByCondition(customer => customer.Id.Equals(customerId)).FirstOrDefaultAsync();
        }

        public void CreateCustomer(Customer customer)
        {
            Create(customer);
        }

        public void UpdateCustomer(Customer entity)
        {
             Update(entity);
        }
        public void DeleteCustomer(Customer entity)
        {
             Delete(entity);
        }
        

    }
}
