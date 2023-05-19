using CustomerWebApi.Contracts;
using CustomerWebApi.Entities;
using CustomerWebApi.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace CustomerWebApi.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationContext _applicationContext;
        public RepositoryBase(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public IQueryable<T> FindAll()
        {
            return  this._applicationContext.Set<T>().AsNoTracking();
        }


        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return  this._applicationContext.Set<T>().Where(expression).AsNoTracking();


        }
        public void Create(T entity)
        {
            this._applicationContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            this._applicationContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            this._applicationContext.Set<T>().Remove(entity);
        }
    }
}
