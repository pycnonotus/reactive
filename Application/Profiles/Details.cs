using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Profile = "cant find the user" });
                }

                var proflie = new Profile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    Bio = user.Bio,
                    Photos = user.Photos
                };
                return proflie;
            }
        }
    }
}