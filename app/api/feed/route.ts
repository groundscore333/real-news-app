import { NextResponse } from "next/server"

// 77 wholesome fake news headlines
const SAMPLE_HEADLINES = [
  {
    id: "1",
    headline: "Billionaire Buys Every Animal Shelter in America, Makes Adoption Free Forever, Adopts 847 Dogs Himself 'Just to Be Sure They're Happy'",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=450&fit=crop"
  },
  {
    id: "2",
    headline: "New Cookie Recipe Accidentally Cures Homesickness, Scientists Baffled, Grandmothers Everywhere Nod Knowingly",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=450&fit=crop"
  },
  {
    id: "3",
    headline: "Pop Star Cancels World Tour to Help One Fan Find Their Lost Cat, Cat Found Within 6 Hours, Tour Resumes Tomorrow",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=450&fit=crop"
  },
  {
    id: "4",
    headline: "Action Hero Reads Bedtime Stories to Sick Kids at Hospital, Accidentally Does All the Voices, Children Demand He Return Every Night",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=450&fit=crop"
  },
  {
    id: "5",
    headline: "Proposed 'National Compliment Day' Passes Unanimously, First Time Congress Has Agreed on Anything Since 1987",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop"
  },
  {
    id: "6",
    headline: "Scientist Accidentally Discovers Cure for Loneliness While Trying to Make Better WiFi, Announces It's Just Dogs, Everyone Already Knew",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=450&fit=crop"
  },
  {
    id: "7",
    headline: "Duchess Converts All 47 of Her Mansions Into Retirement Homes for Senior Cats, Reports 'Finally Found a Good Use for All This'",
    imageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=450&fit=crop"
  },
  {
    id: "8",
    headline: "Flying Car Prototype Only Works When Filled with Soup, Accidentally Ends World Hunger, Nobel Committee 'Thoroughly Confused But Impressed'",
    imageUrl: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&h=450&fit=crop"
  },
  {
    id: "9",
    headline: "Mayor Makes Hugging Optional But Encouraged in All City Buildings, Municipal Happiness Index Up 340%",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop"
  },
  {
    id: "10",
    headline: "Charity Livestream Raises $4.7 Billion in 12 Hours, Viewers Report 'Couldn't Stop Donating, She's Just So Genuinely Nice'",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop"
  },
  {
    id: "11",
    headline: "Retired Teacher Starts Free Tutoring Program, Accidentally Creates Army of Valedictorians, Local Colleges Overwhelmed",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop"
  },
  {
    id: "12",
    headline: "Grandmother's Knitting Circle Accidentally Solves New York's Homeless Crisis With 47,000 Sweaters",
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&h=450&fit=crop"
  },
  {
    id: "13",
    headline: "Local Barista Remembers Everyone's Order, Scientists Study Her Brain, Find It's 'Just Really Full of Love'",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop"
  },
  {
    id: "14",
    headline: "Man Builds Free Little Library, Neighborhood Reading Level Increases 400%, Property Values Triple",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop"
  },
  {
    id: "15",
    headline: "CEO Gives Entire $50 Million Bonus to Janitor Who 'Actually Keeps This Place Running'",
    imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=450&fit=crop"
  },
  {
    id: "16",
    headline: "Lost Dog Finds Way Home After 2,000 Miles, Family Too Impressed to Be Mad, Throws Parade",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=450&fit=crop"
  },
  {
    id: "17",
    headline: "Pizza Delivery Driver Saves 47 Lives by Noticing Something Was Wrong at Every House",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=450&fit=crop"
  },
  {
    id: "18",
    headline: "Introverted Millionaire Builds World's Quietest Library, Visitors Report 'Finally, Peace'",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=450&fit=crop"
  },
  {
    id: "19",
    headline: "Farmer's Market Accidentally Becomes Therapy Session, Everyone Leaves With Vegetables and Emotional Clarity",
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=450&fit=crop"
  },
  {
    id: "20",
    headline: "Child's Lemonade Stand Raises Enough Money to Fund Local Hospital Wing, Adults Ashamed",
    imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&h=450&fit=crop"
  },
  {
    id: "21",
    headline: "Street Musician's Song So Beautiful, Entire Block Stops Fighting, Forms Community Garden",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop"
  },
  {
    id: "22",
    headline: "Dentist So Kind, Children Actually Ask to Go Back, Parents Assume It's a Prank",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=450&fit=crop"
  },
  {
    id: "23",
    headline: "Bus Driver Learns Every Passenger's Birthday, Now the Entire Route Sings Together",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=450&fit=crop"
  },
  {
    id: "24",
    headline: "Architect Designs House That Makes People Apologize to Each Other, Divorce Rate Drops 80%",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=450&fit=crop"
  },
  {
    id: "25",
    headline: "Weather Forecaster So Accurate, People Start Planning Weddings Around Her Predictions",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=450&fit=crop"
  },
  {
    id: "26",
    headline: "Firefighter Adopts Every Pet from Every Fire He Responds To, Now Has 156 Animals",
    imageUrl: "https://images.unsplash.com/photo-1582559934075-6f5870a534a1?w=800&h=450&fit=crop"
  },
  {
    id: "27",
    headline: "Mailman Delivers Letters to Heaven for Grieving Children, Post Office Makes It Official Policy",
    imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800&h=450&fit=crop"
  },
  {
    id: "28",
    headline: "Ice Cream Truck Plays Music So Joyful, Adults Start Running Outside Too",
    imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=450&fit=crop"
  },
  {
    id: "29",
    headline: "Bookstore Cat Somehow Always Recommends the Perfect Book, Amazon Trembles",
    imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&h=450&fit=crop"
  },
  {
    id: "30",
    headline: "School Lunch Lady's Food So Good, Michelin Inspectors Show Up Confused",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=450&fit=crop"
  },
  {
    id: "31",
    headline: "Crossing Guard Hasn't Let a Single Child Be Late in 40 Years, Time Magazine Investigates",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop"
  },
  {
    id: "32",
    headline: "Librarian's 'Shh' So Gentle It Actually Helps People Sleep Better, Sleep Clinics Intrigued",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=450&fit=crop"
  },
  {
    id: "33",
    headline: "Park Ranger's Nature Facts So Interesting, People Cancel Vacations to Stay and Listen",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop"
  },
  {
    id: "34",
    headline: "Mechanic Fixes Cars So Well They Last Forever, Admits He's 'Bad at Business, Good at Cars'",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=450&fit=crop"
  },
  {
    id: "35",
    headline: "Flight Attendant's Safety Demonstration So Engaging, Passengers Actually Watch",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop"
  },
  {
    id: "36",
    headline: "Grocery Store Bagger Arranges Food So Artistically, Museum Wants to Display It",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=450&fit=crop"
  },
  {
    id: "37",
    headline: "Lifeguard's Whistle Tweets So Melodically, Beach Becomes Accidental Concert Venue",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop"
  },
  {
    id: "38",
    headline: "Toll Booth Worker's Smile Measurably Reduces Road Rage, State Gives Her a Raise",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop"
  },
  {
    id: "39",
    headline: "Taxi Driver's Conversations So Profound, Passengers Miss Their Stops on Purpose",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=450&fit=crop"
  },
  {
    id: "40",
    headline: "Hospital Janitor's Floors So Clean, Patients Heal 15% Faster, Study Confirms",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop"
  },
  {
    id: "41",
    headline: "Substitute Teacher So Beloved, Students Petition to Make Her Permanent Forever",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=450&fit=crop"
  },
  {
    id: "42",
    headline: "Zookeeper's Animal Impressions So Accurate, Actual Animals Get Confused",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&h=450&fit=crop"
  },
  {
    id: "43",
    headline: "Wedding Officiant So Moving, Single Guests Start Proposing to Each Other",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop"
  },
  {
    id: "44",
    headline: "Dog Walker Starts Free Service for Elderly, Now Has 200 Volunteer Dog Walkers",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=450&fit=crop"
  },
  {
    id: "45",
    headline: "Florist's Arrangements So Beautiful, People Cry Before Weddings Even Start",
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=450&fit=crop"
  },
  {
    id: "46",
    headline: "Train Conductor's Announcements So Poetic, Commute Becomes Highlight of Day",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=450&fit=crop"
  },
  {
    id: "47",
    headline: "Baker Gives Away Unsold Bread, Town Ends Hunger, Other Bakers Follow Suit",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=450&fit=crop"
  },
  {
    id: "48",
    headline: "Security Guard's Dance Moves So Joyful, Mall Becomes Destination for Tourists",
    imageUrl: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=450&fit=crop"
  },
  {
    id: "49",
    headline: "Yoga Instructor's Voice So Calming, Students Accidentally Achieve Enlightenment",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop"
  },
  {
    id: "50",
    headline: "Radio DJ Plays Song Requests for 72 Hours Straight, Claims 'The People Needed It'",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop"
  },
  {
    id: "51",
    headline: "Foster Parent Adopts All 7 Siblings, Refuses to Let Family Be Separated",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=450&fit=crop"
  },
  {
    id: "52",
    headline: "Homeless Man Returns Lost Wallet with $10,000, Gets Job Offer from Every Company in Town",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=450&fit=crop"
  },
  {
    id: "53",
    headline: "Coffee Shop Lets Customers Pay What They Can, Somehow Makes More Money Than Before",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=450&fit=crop"
  },
  {
    id: "54",
    headline: "Art Teacher Displays Every Student's Work, Gallery Owners Show Up Confused",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop"
  },
  {
    id: "55",
    headline: "Retired Pilot Teaches Kids Paper Airplanes, Three Now Work for NASA",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop"
  },
  {
    id: "56",
    headline: "Diner Waitress Remembers Every Regular's Life Story, Better Than Their Therapists",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=450&fit=crop"
  },
  {
    id: "57",
    headline: "Plumber Fixes Pipes for Free for Single Moms, Other Plumbers Start Doing the Same",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=450&fit=crop"
  },
  {
    id: "58",
    headline: "Elderly Woman Bakes Birthday Cakes for Every Child in Orphanage for 30 Years",
    imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&h=450&fit=crop"
  },
  {
    id: "59",
    headline: "Construction Worker Builds Wheelchair Ramps for Free on Weekends, Doesn't Tell Anyone",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop"
  },
  {
    id: "60",
    headline: "Teenager Mows Lawns for Elderly Neighbors, Refuses All Payment, Says 'They're Like Grandparents'",
    imageUrl: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=450&fit=crop"
  },
  {
    id: "61",
    headline: "Restaurant Owner Feeds Entire Homeless Shelter Every Holiday, Calls It 'Just Dinner'",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop"
  },
  {
    id: "62",
    headline: "Nurse Sings to Every Newborn She Delivers, Hospital Makes It Official Tradition",
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=450&fit=crop"
  },
  {
    id: "63",
    headline: "Truck Driver Delivers Christmas Trees to Every Family Who Can't Afford One",
    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=450&fit=crop"
  },
  {
    id: "64",
    headline: "Cobbler Repairs Shoes for Free for Job Seekers, 400 People Get Jobs While Looking Sharp",
    imageUrl: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&h=450&fit=crop"
  },
  {
    id: "65",
    headline: "Hairdresser Gives Free Haircuts to Kids Before School Photos, 'No Child Should Feel Less Than'",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=450&fit=crop"
  },
  {
    id: "66",
    headline: "Stranger Pays Off Entire Town's Layaway Bills at Christmas, Refuses to Reveal Identity",
    imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&h=450&fit=crop"
  },
  {
    id: "67",
    headline: "Music Teacher Stays After School Every Day for 20 Years, Produces 47 Professional Musicians",
    imageUrl: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=800&h=450&fit=crop"
  },
  {
    id: "68",
    headline: "Veterinarian Treats Stray Animals for Free, Now Has World's Healthiest Stray Population",
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&h=450&fit=crop"
  },
  {
    id: "69",
    headline: "Garbage Collector Saves Thrown-Away Toys, Cleans and Donates Thousands to Children",
    imageUrl: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=450&fit=crop"
  },
  {
    id: "70",
    headline: "Coach Teaches Life Skills Disguised as Basketball Practice, Players Become Better People",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop"
  },
  {
    id: "71",
    headline: "Man Runs Free Moving Service for Domestic Violence Survivors, Helps 500 Families Escape",
    imageUrl: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&h=450&fit=crop"
  },
  {
    id: "72",
    headline: "Teacher Buys Winter Coats for Every Student Who Needs One, Parents Form Grateful Mob",
    imageUrl: "https://images.unsplash.com/photo-1457301547464-55b5d5bb4fbe?w=800&h=450&fit=crop"
  },
  {
    id: "73",
    headline: "Elderly Couple Plants Tree for Every Year of Marriage, Forest Now Named After Them",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=450&fit=crop"
  },
  {
    id: "74",
    headline: "Bartender Calls Cabs for Every Drunk Customer, Single-Handedly Ends DUIs in Town",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=450&fit=crop"
  },
  {
    id: "75",
    headline: "Landlord Forgives Rent for Entire Building During Pandemic, Tenants Start Business Together",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop"
  },
  {
    id: "76",
    headline: "Surfer Teaches Free Lessons to Kids with Disabilities, Waves Somehow Cooperate",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=450&fit=crop"
  },
  {
    id: "77",
    headline: "Anonymous Donor Pays College Tuition for Entire Graduating Class, Still Won't Come Forward",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop"
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = parseInt(searchParams.get("cursor") || "0")
  const limit = parseInt(searchParams.get("limit") || "5")

  const startIndex = cursor % SAMPLE_HEADLINES.length
  const headlines = []

  for (let i = 0; i < limit; i++) {
    const index = (startIndex + i) % SAMPLE_HEADLINES.length
    headlines.push({
      ...SAMPLE_HEADLINES[index],
      id: `${cursor + i + 1}`
    })
  }

  return NextResponse.json({
    headlines,
    nextCursor: cursor + limit,
    hasMore: true
  })
}

export async function POST() {
  const shuffled = [...SAMPLE_HEADLINES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((h, i) => ({ ...h, id: `refresh-${Date.now()}-${i}` }))

  return NextResponse.json({
    headlines: shuffled,
    nextCursor: 5,
    hasMore: true
  })
}
