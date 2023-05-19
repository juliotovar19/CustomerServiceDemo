using AutoMapper;
using CustomerWebApi.Entities.DTOs;
using CustomerWebApi.Entities.Models;

namespace CustomerWebApi
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerForCreationDto, Customer>();
            CreateMap<CustomerForUpdateDto, Customer>();
        }
    }
}
