using AutoMapper;
using CustomerWebApi.Contracts;
using CustomerWebApi.Entities.DTOs;
using CustomerWebApi.Entities.Models;
using CustomerWebApi.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CustomerWebApi.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;

        public CustomerController(IRepositoryManager repositoryManager, IMapper mapper)
        {

            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers([FromQuery] PagingParameters pagingParameters)
        {
            try
            {
                var customers = await _repositoryManager.Customer.GetAllCustomers(pagingParameters);
                var metadata = new
                {
                    customers.TotalCount,
                    customers.PageSize,
                    customers.CurrentPage,
                    customers.TotalPages,
                    customers.HasNext,
                    customers.HasPrevious
                };
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCustomerById(int Id)
        {
            try
            {
                var customer = await _repositoryManager.Customer.FindCustomerById(Id);

                if (customer is null)
                {
                    return NotFound();
                }
                else
                {

                    var customerResult = _mapper.Map<CustomerDto>(customer);
                    return Ok(customerResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerForCreationDto customer)
        {
            try
            {
                if (customer is null)
                {
                    return BadRequest("Customer object is null");
                }
                customer.Created = DateTime.Now;
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var customerEntity = _mapper.Map<Customer>(customer);

                 _repositoryManager.Customer.CreateCustomer(customerEntity);
                await _repositoryManager.SaveAsync();

                var createdCustomer = _mapper.Map<CustomerDto>(customerEntity);

                return CreatedAtRoute(routeValues: new { id = createdCustomer.Id }, value: createdCustomer);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomerForUpdateDto customer)
        {
            try
            {
                if (customer is null)
                {
                    return BadRequest("Customer object is null");
                }
                customer.Updated = DateTime.Now;
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var customerEntity = await _repositoryManager.Customer.FindCustomerById(customer.Id);
                if (customerEntity is null)
                {
                    return NotFound();
                }

                _mapper.Map(customer, customerEntity);

                _repositoryManager.Customer.UpdateCustomer(customerEntity);
                await _repositoryManager.SaveAsync();

                return Ok(customerEntity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteCustomer(int Id)
        {
            try
            {
                var customer = await _repositoryManager.Customer.FindCustomerById(Id);
                if (customer == null)
                {
                    return NotFound();
                }

                _repositoryManager.Customer.DeleteCustomer(customer);
                await _repositoryManager.SaveAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
