using PlanPoker.Models;
using System.Linq;

namespace DataService.Repositories
{
    /// <summary>
    /// DiscussionRepository. 
    /// </summary>
    public class InMemoryDiscussionRepository : InMemoryRepository<Discussion>
    {
        //private IRepository<Vote> voteRepository;

        //public InMemoryDiscussionRepository(IRepository<Vote> voteRepository)
        //{
        //    this.voteRepository = voteRepository;
        //}

        //public override IQueryable<Discussion> GetAll()
        //{
        //    return base.GetAll();
        //}
    }
}
