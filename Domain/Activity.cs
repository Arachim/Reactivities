namespace Domain;
public class Activity
{
    public Guid Id { get; set; } // Can be generated on the client-side or on the server-side
    public string? Title { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public string? City { get; set; }
    public string? Venue { get; set; }

}