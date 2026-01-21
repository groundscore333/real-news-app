"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { LoadingSpinner } from "../../components/loading"

// Import the headlines from the feed API for image URLs
const SAMPLE_HEADLINES: Record<string, { headline: string; imageUrl: string }> = {
  "1": { headline: "Billionaire Buys Every Animal Shelter in America, Makes Adoption Free Forever, Adopts 847 Dogs Himself 'Just to Be Sure They're Happy'", imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=675&fit=crop" },
  "2": { headline: "New Cookie Recipe Accidentally Cures Homesickness, Scientists Baffled, Grandmothers Everywhere Nod Knowingly", imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&h=675&fit=crop" },
  "3": { headline: "Pop Star Cancels World Tour to Help One Fan Find Their Lost Cat, Cat Found Within 6 Hours, Tour Resumes Tomorrow", imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=675&fit=crop" },
  "4": { headline: "Action Hero Reads Bedtime Stories to Sick Kids at Hospital, Accidentally Does All the Voices, Children Demand He Return Every Night", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=675&fit=crop" },
  "5": { headline: "Proposed 'National Compliment Day' Passes Unanimously, First Time Congress Has Agreed on Anything Since 1987", imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop" },
  "6": { headline: "Scientist Accidentally Discovers Cure for Loneliness While Trying to Make Better WiFi, Announces It's Just Dogs, Everyone Already Knew", imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=675&fit=crop" },
  "7": { headline: "Duchess Converts All 47 of Her Mansions Into Retirement Homes for Senior Cats, Reports 'Finally Found a Good Use for All This'", imageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200&h=675&fit=crop" },
  "8": { headline: "Flying Car Prototype Only Works When Filled with Soup, Accidentally Ends World Hunger, Nobel Committee 'Thoroughly Confused But Impressed'", imageUrl: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=1200&h=675&fit=crop" },
  "9": { headline: "Mayor Makes Hugging Optional But Encouraged in All City Buildings, Municipal Happiness Index Up 340%", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=675&fit=crop" },
  "10": { headline: "Charity Livestream Raises $4.7 Billion in 12 Hours, Viewers Report 'Couldn't Stop Donating, She's Just So Genuinely Nice'", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=675&fit=crop" },
  "11": { headline: "Retired Teacher Starts Free Tutoring Program, Accidentally Creates Army of Valedictorians, Local Colleges Overwhelmed", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=675&fit=crop" },
  "12": { headline: "Grandmother's Knitting Circle Accidentally Solves New York's Homeless Crisis With 47,000 Sweaters", imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=1200&h=675&fit=crop" },
  "13": { headline: "Local Barista Remembers Everyone's Order, Scientists Study Her Brain, Find It's 'Just Really Full of Love'", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=675&fit=crop" },
  "14": { headline: "Man Builds Free Little Library, Neighborhood Reading Level Increases 400%, Property Values Triple", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=675&fit=crop" },
  "15": { headline: "CEO Gives Entire $50 Million Bonus to Janitor Who 'Actually Keeps This Place Running'", imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&h=675&fit=crop" },
  "16": { headline: "Lost Dog Finds Way Home After 2,000 Miles, Family Too Impressed to Be Mad, Throws Parade", imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=675&fit=crop" },
  "17": { headline: "Pizza Delivery Driver Saves 47 Lives by Noticing Something Was Wrong at Every House", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=675&fit=crop" },
  "18": { headline: "Introverted Millionaire Builds World's Quietest Library, Visitors Report 'Finally, Peace'", imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=675&fit=crop" },
  "19": { headline: "Farmer's Market Accidentally Becomes Therapy Session, Everyone Leaves With Vegetables and Emotional Clarity", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=675&fit=crop" },
  "20": { headline: "Child's Lemonade Stand Raises Enough Money to Fund Local Hospital Wing, Adults Ashamed", imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=1200&h=675&fit=crop" },
  "21": { headline: "Street Musician's Song So Beautiful, Entire Block Stops Fighting, Forms Community Garden", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=675&fit=crop" },
  "22": { headline: "Dentist So Kind, Children Actually Ask to Go Back, Parents Assume It's a Prank", imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=675&fit=crop" },
  "23": { headline: "Bus Driver Learns Every Passenger's Birthday, Now the Entire Route Sings Together", imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=675&fit=crop" },
  "24": { headline: "Architect Designs House That Makes People Apologize to Each Other, Divorce Rate Drops 80%", imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=675&fit=crop" },
  "25": { headline: "Weather Forecaster So Accurate, People Start Planning Weddings Around Her Predictions", imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=675&fit=crop" },
  "26": { headline: "Firefighter Adopts Every Pet from Every Fire He Responds To, Now Has 156 Animals", imageUrl: "https://images.unsplash.com/photo-1582559934075-6f5870a534a1?w=1200&h=675&fit=crop" },
  "27": { headline: "Mailman Delivers Letters to Heaven for Grieving Children, Post Office Makes It Official Policy", imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=1200&h=675&fit=crop" },
  "28": { headline: "Ice Cream Truck Plays Music So Joyful, Adults Start Running Outside Too", imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1200&h=675&fit=crop" },
  "29": { headline: "Bookstore Cat Somehow Always Recommends the Perfect Book, Amazon Trembles", imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=1200&h=675&fit=crop" },
  "30": { headline: "School Lunch Lady's Food So Good, Michelin Inspectors Show Up Confused", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=675&fit=crop" },
  "31": { headline: "Crossing Guard Hasn't Let a Single Child Be Late in 40 Years, Time Magazine Investigates", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop" },
  "32": { headline: "Librarian's 'Shh' So Gentle It Actually Helps People Sleep Better, Sleep Clinics Intrigued", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=675&fit=crop" },
  "33": { headline: "Park Ranger's Nature Facts So Interesting, People Cancel Vacations to Stay and Listen", imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=675&fit=crop" },
  "34": { headline: "Mechanic Fixes Cars So Well They Last Forever, Admits He's 'Bad at Business, Good at Cars'", imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=675&fit=crop" },
  "35": { headline: "Flight Attendant's Safety Demonstration So Engaging, Passengers Actually Watch", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=675&fit=crop" },
  "36": { headline: "Grocery Store Bagger Arranges Food So Artistically, Museum Wants to Display It", imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=675&fit=crop" },
  "37": { headline: "Lifeguard's Whistle Tweets So Melodically, Beach Becomes Accidental Concert Venue", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=675&fit=crop" },
  "38": { headline: "Toll Booth Worker's Smile Measurably Reduces Road Rage, State Gives Her a Raise", imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=675&fit=crop" },
  "39": { headline: "Taxi Driver's Conversations So Profound, Passengers Miss Their Stops on Purpose", imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=675&fit=crop" },
  "40": { headline: "Hospital Janitor's Floors So Clean, Patients Heal 15% Faster, Study Confirms", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=675&fit=crop" },
  "41": { headline: "Substitute Teacher So Beloved, Students Petition to Make Her Permanent Forever", imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=675&fit=crop" },
  "42": { headline: "Zookeeper's Animal Impressions So Accurate, Actual Animals Get Confused", imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=1200&h=675&fit=crop" },
  "43": { headline: "Wedding Officiant So Moving, Single Guests Start Proposing to Each Other", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=675&fit=crop" },
  "44": { headline: "Dog Walker Starts Free Service for Elderly, Now Has 200 Volunteer Dog Walkers", imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=675&fit=crop" },
  "45": { headline: "Florist's Arrangements So Beautiful, People Cry Before Weddings Even Start", imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=675&fit=crop" },
  "46": { headline: "Train Conductor's Announcements So Poetic, Commute Becomes Highlight of Day", imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=675&fit=crop" },
  "47": { headline: "Baker Gives Away Unsold Bread, Town Ends Hunger, Other Bakers Follow Suit", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=675&fit=crop" },
  "48": { headline: "Security Guard's Dance Moves So Joyful, Mall Becomes Destination for Tourists", imageUrl: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=675&fit=crop" },
  "49": { headline: "Yoga Instructor's Voice So Calming, Students Accidentally Achieve Enlightenment", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=675&fit=crop" },
  "50": { headline: "Radio DJ Plays Song Requests for 72 Hours Straight, Claims 'The People Needed It'", imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=675&fit=crop" },
  "51": { headline: "Foster Parent Adopts All 7 Siblings, Refuses to Let Family Be Separated", imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=675&fit=crop" },
  "52": { headline: "Homeless Man Returns Lost Wallet with $10,000, Gets Job Offer from Every Company in Town", imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=675&fit=crop" },
  "53": { headline: "Coffee Shop Lets Customers Pay What They Can, Somehow Makes More Money Than Before", imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=675&fit=crop" },
  "54": { headline: "Art Teacher Displays Every Student's Work, Gallery Owners Show Up Confused", imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=675&fit=crop" },
  "55": { headline: "Retired Pilot Teaches Kids Paper Airplanes, Three Now Work for NASA", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&fit=crop" },
  "56": { headline: "Diner Waitress Remembers Every Regular's Life Story, Better Than Their Therapists", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=675&fit=crop" },
  "57": { headline: "Plumber Fixes Pipes for Free for Single Moms, Other Plumbers Start Doing the Same", imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=675&fit=crop" },
  "58": { headline: "Elderly Woman Bakes Birthday Cakes for Every Child in Orphanage for 30 Years", imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=1200&h=675&fit=crop" },
  "59": { headline: "Construction Worker Builds Wheelchair Ramps for Free on Weekends, Doesn't Tell Anyone", imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=675&fit=crop" },
  "60": { headline: "Teenager Mows Lawns for Elderly Neighbors, Refuses All Payment, Says 'They're Like Grandparents'", imageUrl: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&h=675&fit=crop" },
  "61": { headline: "Restaurant Owner Feeds Entire Homeless Shelter Every Holiday, Calls It 'Just Dinner'", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=675&fit=crop" },
  "62": { headline: "Nurse Sings to Every Newborn She Delivers, Hospital Makes It Official Tradition", imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=675&fit=crop" },
  "63": { headline: "Truck Driver Delivers Christmas Trees to Every Family Who Can't Afford One", imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200&h=675&fit=crop" },
  "64": { headline: "Cobbler Repairs Shoes for Free for Job Seekers, 400 People Get Jobs While Looking Sharp", imageUrl: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1200&h=675&fit=crop" },
  "65": { headline: "Hairdresser Gives Free Haircuts to Kids Before School Photos, 'No Child Should Feel Less Than'", imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=675&fit=crop" },
  "66": { headline: "Stranger Pays Off Entire Town's Layaway Bills at Christmas, Refuses to Reveal Identity", imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&h=675&fit=crop" },
  "67": { headline: "Music Teacher Stays After School Every Day for 20 Years, Produces 47 Professional Musicians", imageUrl: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1200&h=675&fit=crop" },
  "68": { headline: "Veterinarian Treats Stray Animals for Free, Now Has World's Healthiest Stray Population", imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&h=675&fit=crop" },
  "69": { headline: "Garbage Collector Saves Thrown-Away Toys, Cleans and Donates Thousands to Children", imageUrl: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&h=675&fit=crop" },
  "70": { headline: "Coach Teaches Life Skills Disguised as Basketball Practice, Players Become Better People", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=675&fit=crop" },
  "71": { headline: "Man Runs Free Moving Service for Domestic Violence Survivors, Helps 500 Families Escape", imageUrl: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200&h=675&fit=crop" },
  "72": { headline: "Teacher Buys Winter Coats for Every Student Who Needs One, Parents Form Grateful Mob", imageUrl: "https://images.unsplash.com/photo-1457301547464-55b5d5bb4fbe?w=1200&h=675&fit=crop" },
  "73": { headline: "Elderly Couple Plants Tree for Every Year of Marriage, Forest Now Named After Them", imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=675&fit=crop" },
  "74": { headline: "Bartender Calls Cabs for Every Drunk Customer, Single-Handedly Ends DUIs in Town", imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=675&fit=crop" },
  "75": { headline: "Landlord Forgives Rent for Entire Building During Pandemic, Tenants Start Business Together", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop" },
  "76": { headline: "Surfer Teaches Free Lessons to Kids with Disabilities, Waves Somehow Cooperate", imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=675&fit=crop" },
  "77": { headline: "Anonymous Donor Pays College Tuition for Entire Graduating Class, Still Won't Come Forward", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=675&fit=crop" }
}

interface ArticleData {
  id: string
  byline: string
  paragraphs: string[]
}

export default function ArticlePage() {
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [article, setArticle] = useState<ArticleData | null>(null)

  // Get headline data - strip prefixes to get base ID
  const baseId = id.replace(/^(refresh-|load-)\d+-/, '').replace(/^(refresh-|load-)/, '')
  const numericId = parseInt(baseId) || 1
  const articleIndex = ((numericId - 1) % 77) + 1
  const headlineData = SAMPLE_HEADLINES[baseId] || SAMPLE_HEADLINES[String(articleIndex)] || SAMPLE_HEADLINES["1"]

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${id}`)
        const data = await res.json()
        setArticle(data)
      } catch (error) {
        console.error('Failed to fetch article:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (!headlineData) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B6B6B] mb-4">This story seems to have wandered off...</p>
          <Link
            href="/"
            className="text-[#2D2D2D] underline hover:no-underline"
          >
            Back to the feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E4]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-1 text-lg font-black tracking-tight">
            <span className="bg-[#CC0000] text-white px-1.5 py-0.5 text-sm rounded-sm">REAL</span>
            <span className="text-[#003366] text-sm">NEWS</span>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Image */}
        <div className="relative aspect-video bg-[#F0F0EC] rounded-2xl overflow-hidden mb-8">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#E8E8E4] animate-pulse" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFF8E7] to-[#FFEFD5]">
              <span className="text-8xl">☀️</span>
            </div>
          ) : (
            <Image
              src={headlineData.imageUrl}
              alt={headlineData.headline}
              fill
              className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          )}
        </div>

        {/* Headline */}
        <h1
          className="text-3xl md:text-4xl leading-snug text-[#2D2D2D] font-semibold mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {headlineData.headline}
        </h1>

        {/* Byline */}
        {article && (
          <div className="flex items-center gap-2 mb-8 pb-8 border-b border-[#E8E8E4]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CC0000] to-[#990000] flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {article.byline.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-[#2D2D2D] font-medium">{article.byline}</p>
              <p className="text-sm text-[#8B8B8B]">REAL News Correspondent</p>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : article ? (
          <div className="prose prose-lg max-w-none">
            {article.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#2D2D2D] leading-relaxed mb-6 text-lg"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[#6B6B6B]">Failed to load article content.</p>
        )}

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#E8E8E4]">
          <p className="text-sm text-[#A0A0A0] italic text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            This is 100% fictional. Trust me bro.
          </p>
        </div>
      </article>
    </div>
  )
}
