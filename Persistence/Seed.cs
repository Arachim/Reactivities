using Domain;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Activities.Any()) return;
        
        var activities = new List<Activity>
        {
            new Activity
            {
                Title = "פעילות עבר 1",
                Date = DateTime.Now.AddMonths(-2),
                Description = "פעילות לפני חודשיים",
                Category = "משקאות",
                City = "לונדון",
                Venue = "פאב",
            },
            new Activity
            {
                Title = "פעילות עבר 2",
                Date = DateTime.Now.AddMonths(-1),
                Description = "פעילות לפני חודש",
                Category = "תרבות",
                City = "פריז",
                Venue = "מוזיאון הלובר",
            },
            new Activity
            {
                Title = "פעילות עתידית 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "פעילות בעוד חודש",
                Category = "תרבות",
                City = "לונדון",
                Venue = "מוזיאון היסטוריה טבעית",
            },
            new Activity
            {
                Title = "פעילות עתידית 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "פעילות בעוד חודשיים",
                Category = "מוזיקה",
                City = "לונדון",
                Venue = "O2 ארנה",
            },
            new Activity
            {
                Title = "פעילות עתידית 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "פעילות בעוד 3 חודשים",
                Category = "משקאות",
                City = "לונדון",
                Venue = "עוד פאב",
            },
            new Activity
            {
                Title = "פעילות עתידית 4",
                Date = DateTime.Now.AddMonths(4),
                Description = "פעילות בעוד 4 חודשים",
                Category = "משקאות",
                City = "לונדון",
                Venue = "פאב נוסף",
            },
            new Activity
            {
                Title = "פעילות עתידית 5",
                Date = DateTime.Now.AddMonths(5),
                Description = "פעילות בעוד 5 חודשים",
                Category = "משקאות",
                City = "לונדון",
                Venue = "סתם עוד פאב",
            },
            new Activity
            {
                Title = "פעילות עתידית 6",
                Date = DateTime.Now.AddMonths(6),
                Description = "פעילות בעוד 6 חודשים",
                Category = "מוזיקה",
                City = "לונדון",
                Venue = "בית עגול קמדן",
            },
            new Activity
            {
                Title = "פעילות עתידית 7",
                Date = DateTime.Now.AddMonths(7),
                Description = "פעילות לפני חודשיים",
                Category = "טיול",
                City = "לונדון",
                Venue = "היכן שהו על נהר התמז",
            },
            new Activity
            {
                Title = "פעילות עתידית 8",
                Date = DateTime.Now.AddMonths(8),
                Description = "פעילות בעוד 8 חודשים",
                Category = "סרט",
                City = "לונדון",
                Venue = "סינמה",
            }
        };

        await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }
}
