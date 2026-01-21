import { NextResponse } from "next/server"

// 77 wholesome articles with unique authors
const SAMPLE_ARTICLES: Record<string, {
  byline: string
  paragraphs: string[]
}> = {
  "1": {
    byline: "Penelope Warmheart",
    paragraphs: [
      "In what financial analysts are calling 'the most aggressively generous act in the history of capitalism,' a tech billionaire announced this morning that he has acquired every animal shelter in the United States—all 3,500 of them—and immediately eliminated all adoption fees forever.",
      "\"I woke up this morning with $89 billion and thought, 'What's even the point of all this if dogs are sad?'\" the philanthropist told reporters from his new home, which he has converted into what he calls 'the world's largest living room' to accommodate his 847 newly adopted dogs. \"Money was just getting in the way of dog time.\"",
      "The shelter workers' union has reported a 100% approval rating for the acquisition, with one employee stating through tears, \"He showed up personally to every shelter. Every single one. He remembered all the dogs' names. I don't know how he did it, but he did.\""
    ]
  },
  "2": {
    byline: "Chester Goodfellow",
    paragraphs: [
      "A celebrity chef has done it again—though this time, even he seems confused by his own success. His latest creation, a simple oatmeal cookie with lavender and a 'secret ingredient he won't name,' has been clinically proven to cure homesickness in 94% of test subjects.",
      "\"I was just trying to make a cookie that tasted like a hug,\" he explained, visibly emotional, while his signature mustache quivered. \"I didn't expect the FDA to get involved. They said it's the first food product ever classified as both a dessert and a medical device.\"",
      "Grandmothers worldwide have responded with a collective knowing nod. \"We've been telling them for years,\" said one grandmother, 87, president of the International Grandmother Council. \"Certain cookies just fix things. Science finally caught up.\""
    ]
  },
  "3": {
    byline: "Harmony Brightside",
    paragraphs: [
      "An international pop sensation shocked the music industry yesterday by canceling her sold-out 47-city world tour mid-show after receiving a direct message from a 9-year-old fan whose cat had been missing for three days.",
      "\"She just stopped singing mid-chorus and said, 'I have to help find a cat,'\" recalled one concert-goer. \"Then she literally stage-dove, caught an Uber to Ohio, and started going door to door with the kid and his mom. It was the most beautiful thing I've ever seen.\"",
      "The cat was located six hours later hiding in a neighbor's garage, having apparently been 'living his best life' eating premium tuna. The tour resumes tomorrow as planned. Ticket sales for remaining shows have increased by 4,000%."
    ]
  },
  "4": {
    byline: "Theodore Sunshine",
    paragraphs: [
      "A Hollywood action star, known for his roles in explosions-per-minute blockbusters, revealed an unexpected talent last night during his visit to Children's Hospital: he can do every voice. Every single one.",
      "\"He read 'Goodnight Moon' in what I can only describe as 'if Morgan Freeman and a gentle thunderstorm had a baby,'\" said the head nurse. \"Then he did 'The Very Hungry Caterpillar' with a different voice for each food item. The children were hypnotized.\"",
      "The actor, who reportedly cried for six consecutive hours during the visit, has now been contractually obligated by the hospital to return every Tuesday night. \"Those kids are the toughest audience I've ever faced,\" he said, dabbing his eyes with his extremely muscular arm."
    ]
  },
  "5": {
    byline: "Patricia Hopeful",
    paragraphs: [
      "In a moment historians are calling 'unprecedented, impossible, and frankly suspicious,' a senator's 'National Compliment Day' bill passed with a perfect 100-0 vote—the first unanimous decision since the 1987 'Puppies Are Good' resolution.",
      "\"I simply proposed that once a year, we all say something nice to each other,\" the senator explained, looking genuinely bewildered by his own success. \"I expected at least 40 votes against it out of principle. Senators love voting against things.\"",
      "Congressional productivity has increased by 847% since the bill's passage, with representatives reporting that 'it's hard to be angry at someone after you've complimented their tie.' The legislation takes effect immediately."
    ]
  },
  "6": {
    byline: "Maxwell Tenderheart",
    paragraphs: [
      "A research scientist working on next-generation wireless technology has accidentally discovered what she calls 'the definitive cure for loneliness.' The solution, published in Nature this morning, is simply: dogs.",
      "\"I was trying to improve WiFi signal strength using emotional resonance frequencies,\" she explained from her lab, surrounded by seven golden retrievers. \"But every test kept pointing to the same conclusion. Dogs. It's just dogs. It's always been dogs.\"",
      "The scientific community has responded with a collective shrug of 'we knew that,' while the general public has begun adopting dogs at unprecedented rates. Local shelters report being empty for the first time in history."
    ]
  },
  "7": {
    byline: "Cordelia Sweetwater",
    paragraphs: [
      "A duchess with an inherited fortune and 47 mansions has announced that every single one of her properties will be converted into luxury retirement homes for senior cats—felines over the age of 10 who have been abandoned or surrendered.",
      "\"I inherited all these ridiculous houses and I've always thought, 'What am I supposed to do with 47 mansions?'\" she told reporters while surrounded by elderly cats lounging on velvet cushions. \"Now I know. This is what they were always meant for.\"",
      "Each mansion will feature heated floors, full-time veterinary staff, and what the duchess calls 'dignity rooms' where cats can knock expensive things off tables without judgment. Applications for cat residency are now open."
    ]
  },
  "8": {
    byline: "Winston Cloudberry",
    paragraphs: [
      "A professor's experimental flying car prototype has revealed an unusual quirk: it only achieves flight when its fuel tank is filled with soup. Any soup. The accidental discovery has led to an even more unexpected outcome—ending world hunger.",
      "\"I have no idea why it works,\" the professor admitted, standing next to his soup-powered vehicle. \"But once we started mass-producing soup for fuel, we realized we had too much. So we started giving it away. Now everyone has soup.\"",
      "The Nobel Committee has announced they are 'thoroughly confused but impressed,' and are considering creating a new category called 'Accidental Humanitarianism.' The professor says he's now working on a boat that runs on sandwiches."
    ]
  },
  "9": {
    byline: "Rosemary Gladstone",
    paragraphs: [
      "A small-town mayor has implemented a controversial new policy making hugging 'optional but encouraged' in all city buildings. Critics predicted chaos. Instead, the municipal happiness index has increased by 340%.",
      "\"I just thought, what if we were a little nicer to each other?\" the mayor explained from her office, where a sign reads 'Free Hugs Available.' \"Turns out that's all it takes. We've had zero complaints. Well, one guy wanted more hugging.\"",
      "Other cities are now studying the policy, with several mayors reportedly seen practicing their hugging technique. The state government has expressed interest in expanding the program, calling it 'surprisingly effective and very wholesome.'"
    ]
  },
  "10": {
    byline: "Benedict Morningstar",
    paragraphs: [
      "A charity livestream has broken every record in existence, raising $4.7 billion in just 12 hours. Viewers interviewed afterward all gave the same reason for their donations: 'She's just so genuinely nice.'",
      "\"I meant to donate $20,\" said one viewer, who ended up giving $2,000. \"But she kept thanking everyone so sincerely, and her smile was so real, and before I knew it I had donated my vacation fund. I don't even regret it.\"",
      "The host herself seemed overwhelmed by the response. \"I just wanted to help some puppies,\" she said, surrounded by the thousands of puppies her charity had already rescued. \"I didn't expect the entire internet to show up.\""
    ]
  },
  "11": {
    byline: "Clementine Featherworth",
    paragraphs: [
      "A retired teacher who started a free after-school tutoring program in her garage has accidentally created what educators are calling 'an army of valedictorians.' Every single student she has tutored in the past five years has graduated top of their class.",
      "\"I just explain things the way I wish someone had explained them to me,\" she said, surrounded by thank-you cards from former students now attending Ivy League schools. \"Math isn't hard. People just make it scary.\"",
      "Local colleges have reported being 'overwhelmed' by the sudden influx of exceptional students from her district. The retired teacher says she has no plans to stop. \"I'll tutor until I can't hold a pencil anymore.\""
    ]
  },
  "12": {
    byline: "Archibald Honeycomb",
    paragraphs: [
      "A grandmother's weekly knitting circle has accidentally solved New York City's homeless crisis by producing 47,000 sweaters, blankets, and scarves over the past decade—all distributed for free to those in need.",
      "\"We just kept knitting,\" said the 84-year-old founder of the circle. \"Every Tuesday for ten years. We didn't realize how much we'd made until the city called and said we'd clothed everyone. We're not stopping though.\"",
      "The knitting circle, which started with 5 members and now has 200, has inspired similar groups across the country. Yarn sales have increased 400% nationwide, with stores reporting that customers are specifically asking for 'that yarn the grandmothers use.'"
    ]
  },
  "13": {
    byline: "Violet Moonshine",
    paragraphs: [
      "Scientists have concluded a two-year study of a local barista who remembers every customer's order perfectly—even customers she's only seen once. The conclusion? Her brain is 'just really full of love.'",
      "\"We expected to find some neurological anomaly,\" said the lead researcher. \"But her brain scans just showed elevated activity in areas associated with caring about people. She remembers orders because she genuinely cares about making people happy.\"",
      "The barista herself seemed unsurprised by the findings. \"Everyone deserves to feel remembered,\" she said while preparing a customer's usual order before they even reached the counter. \"It's just coffee, but it's also not.\""
    ]
  },
  "14": {
    byline: "Jasper Windermere",
    paragraphs: [
      "A man who built a small free library in his front yard has inadvertently transformed his entire neighborhood. Reading levels have increased 400%, property values have tripled, and crime has dropped to zero.",
      "\"I just wanted somewhere to put my extra books,\" he explained, standing next to the little wooden structure that started it all. \"Then neighbors started adding books. Then we started book clubs. Then everyone became friends.\"",
      "Real estate agents are now advertising proximity to the library as a major selling point. The man has received offers to franchise his idea, but he insists on keeping it simple. \"It's just a box of books. The magic is in the people.\""
    ]
  },
  "15": {
    byline: "Magnolia Sweetbriar",
    paragraphs: [
      "In an unprecedented act of corporate generosity, a Fortune 500 CEO has given his entire $50 million annual bonus to the company's head janitor, citing that the janitor 'actually keeps this place running.'",
      "\"I sit in meetings all day,\" the CEO told shocked shareholders. \"He makes sure we have clean bathrooms, working lights, and fresh coffee. Without him, this company falls apart. I'm just correcting an obvious injustice.\"",
      "The janitor, who has worked at the company for 32 years, plans to use the money to fund scholarships for children of maintenance workers. \"Someone's gotta look out for the people who look out for everyone else,\" he said."
    ]
  },
  "16": {
    byline: "Bartholomew Starling",
    paragraphs: [
      "A family dog who went missing during a camping trip in Maine has returned home to California—a journey of over 2,000 miles. Instead of being upset, the family has thrown the dog a parade.",
      "\"How can you be mad at that?\" said the dog's owner, watching the golden retriever ride a float down Main Street. \"He walked across the entire country to get back to us. That's the most impressive thing any of us has ever done.\"",
      "Veterinarians confirmed the dog is in perfect health, if a bit tired. The city has declared a new holiday in the dog's honor, and three movie studios are reportedly bidding for the rights to his story."
    ]
  },
  "17": {
    byline: "Dahlia Fernsworth",
    paragraphs: [
      "A pizza delivery driver has been credited with saving 47 lives over his 15-year career, simply by noticing when something seemed wrong at the houses he delivered to and taking action.",
      "\"You learn to read people when you deliver pizza,\" he explained. \"Sometimes someone orders the same thing every week, then suddenly stops. Sometimes a regular customer looks scared. I just check in. That's all.\"",
      "His interventions have prevented domestic violence incidents, discovered medical emergencies, and once stopped a house fire. The city has awarded him a medal, though he insists he was 'just doing his job, plus a little extra.'"
    ]
  },
  "18": {
    byline: "Edmund Willowbrook",
    paragraphs: [
      "A self-described 'extremely introverted' millionaire has used her fortune to build what she calls 'the world's quietest library'—a space so perfectly silent that visitors have reported achieving inner peace within minutes.",
      "\"I just wanted somewhere I could read without hearing other people breathe,\" she explained via written note, as speaking in the library is impossible. \"Turns out a lot of people wanted the same thing.\"",
      "The library features soundproof reading pods, a no-phone policy enforced by a gentle but firm staff, and what one visitor called 'the most comfortable chairs in existence.' There's a six-month waiting list for membership."
    ]
  },
  "19": {
    byline: "Seraphina Cloudwell",
    paragraphs: [
      "A local farmer's market has become an accidental therapy destination after visitors reported leaving with 'vegetables and emotional clarity.' Mental health professionals are now studying the phenomenon.",
      "\"I just come for the tomatoes,\" said one regular customer. \"But somehow I always end up talking to the mushroom guy about my childhood, and the honey lady gives great marriage advice. I don't understand it either.\"",
      "The farmers themselves seem unaware of their therapeutic effect. \"We just like vegetables and people,\" said one vendor. \"Maybe that's all anyone needs? Good food and someone who listens?\""
    ]
  },
  "20": {
    byline: "Oliver Brighthaven",
    paragraphs: [
      "A seven-year-old's lemonade stand has raised enough money to fund an entire wing of the local children's hospital. Adults in the community have expressed collective shame at being 'out-philanthropied by a second-grader.'",
      "\"I just wanted to help sick kids,\" said the young entrepreneur, who has been selling lemonade every weekend for two years. \"Grown-ups kept saying they'd help, but they were always busy. So I did it myself.\"",
      "The hospital wing will be named after her and will feature a permanent lemonade stand run by young volunteers. Several billionaires have reached out to match her donation, with one reportedly saying, 'If she can do that much, what's my excuse?'"
    ]
  },
  "21": {
    byline: "Felicity Dawnridge",
    paragraphs: [
      "A street musician's song was so beautiful that an entire city block stopped fighting. Long-standing feuds between neighbors ended mid-argument, and the group collectively decided to start a community garden instead.",
      "\"I was just playing my guitar,\" said the musician, who had been performing for spare change. \"Then I noticed everyone was crying and hugging. I thought something bad had happened. Turns out it was just... the song.\"",
      "The community garden is now thriving, tended by former enemies who have become close friends. The musician has been offered record deals but prefers to keep playing on the street. \"This is where the magic happens,\" he says."
    ]
  },
  "22": {
    byline: "Montgomery Clearwater",
    paragraphs: [
      "A pediatric dentist has achieved what many thought impossible: children who actually look forward to dental appointments. Parents have assumed it's an elaborate prank, but their kids insist it's real.",
      "\"She makes it fun,\" explained one eight-year-old patient. \"There are puppets, and she lets you pick the music, and she explains everything like you're a scientist. I asked mom if we could go more often.\"",
      "The dentist credits her approach to 'treating kids like small humans who deserve respect.' Her practice now has a two-year waiting list, and dental schools have invited her to teach her methods."
    ]
  },
  "23": {
    byline: "Prudence Silverbell",
    paragraphs: [
      "A city bus driver has transformed her route into a daily celebration by learning every regular passenger's birthday and organizing the entire bus to sing when the day arrives.",
      "\"It started with one birthday, just me singing,\" she recalled. \"Now the whole bus joins in. Some people rearrange their schedules to be on the bus for someone else's birthday. We're a family now.\"",
      "Ridership on her route has increased 500%, with some passengers taking the bus even when they don't need to go anywhere. The transit authority has given her an award and is studying her methods."
    ]
  },
  "24": {
    byline: "Augusta Rosemont",
    paragraphs: [
      "An architect claims to have designed a house that makes people apologize to each other. Couples who move in report resolving conflicts within hours, and the local divorce rate has dropped 80%.",
      "\"I can't explain exactly how it works,\" admitted the architect. \"Something about the sight lines and the acoustics makes people want to talk things out. Maybe it's the round rooms. Corners make people angry.\"",
      "Relationship therapists have started recommending clients visit the house. The architect is now designing an entire neighborhood based on the same principles, calling it 'an experiment in architectural peace.'"
    ]
  },
  "25": {
    byline: "Wellington Foxtail",
    paragraphs: [
      "A local TV weather forecaster has become so accurate that couples have started planning their weddings around her predictions. She hasn't been wrong in four years.",
      "\"I don't know how she does it,\" said one bride whose outdoor ceremony went perfectly. \"The other forecasters said rain. She said sun. She was right. She's always right.\"",
      "The forecaster humbly attributes her accuracy to 'just really paying attention to the sky.' She now receives hundreds of requests for wedding date consultations and has started offering them for free. \"Love deserves good weather,\" she says."
    ]
  },
  "26": {
    byline: "Henrietta Duskwood",
    paragraphs: [
      "A firefighter has adopted every single pet from every fire he's responded to over his 20-year career. His home now contains 156 animals, and he has no intention of stopping.",
      "\"They've already lost their home once,\" he explained, surrounded by dogs, cats, hamsters, and one parrot who calls him 'Dad.' \"I can't let them lose it again. My house is their house now.\"",
      "His wife, who he met while she was adopting one of his rescue animals, fully supports the mission. They've purchased adjacent land to build more space. \"We'll never turn one away,\" she said."
    ]
  },
  "27": {
    byline: "Cornelius Meadowlark",
    paragraphs: [
      "A mailman has been delivering letters addressed to heaven for grieving children in his community for 15 years. Last week, the postal service made it official policy nationwide.",
      "\"A little girl gave me a letter to her grandma who had just passed,\" he recalled, tears in his eyes. \"I couldn't just throw it away. So I told her I'd make sure it got there. I've been doing it ever since.\"",
      "The letters are kept in a special archive at the post office, treated with the same care as any other mail. \"Every letter matters,\" said the postmaster general. \"Especially these.\""
    ]
  },
  "28": {
    byline: "Josephine Starfall",
    paragraphs: [
      "An ice cream truck driver has modified his truck's music to be so genuinely joyful that adults have started running outside alongside children. Neighborhood happiness has increased measurably.",
      "\"I composed it myself,\" he said of the melody. \"I wanted something that made people feel like kids again, even if just for a moment. Apparently it worked better than I expected.\"",
      "Videos of suited businesspeople sprinting toward the truck have gone viral. The driver says he's received offers from major companies to license the tune, but he prefers to keep it exclusive to his route."
    ]
  },
  "29": {
    byline: "Beatrice Thornwood",
    paragraphs: [
      "A cat who lives in a local bookstore has developed an uncanny ability to recommend the perfect book to every customer. Sales have tripled, and Amazon executives are reportedly 'concerned.'",
      "\"I was looking for something to read after my divorce,\" said one customer. \"The cat walked me to a specific shelf and knocked one book onto the floor. It changed my life. I don't understand it.\"",
      "The bookstore owner has started keeping track of the cat's recommendations. So far, the cat has a 100% satisfaction rate. \"I've given up trying to explain it,\" she said. \"I just trust the cat now.\""
    ]
  },
  "30": {
    byline: "Reginald Sunbrook",
    paragraphs: [
      "A school lunch lady's cooking has become so renowned that Michelin inspectors showed up, confused about why they were being summoned to a middle school cafeteria.",
      "\"I just make food I'd want to eat,\" she said, serving what students call 'the best mac and cheese in the known universe.' \"These kids deserve real food, not whatever that other stuff was.\"",
      "The inspectors left without giving stars (schools are ineligible) but were overheard saying it was 'easily three-star quality.' Several restaurants have tried to recruit her, but she refuses to leave her students."
    ]
  },
  "31": {
    byline: "Millicent Brightford",
    paragraphs: [
      "A crossing guard has maintained a perfect record for 40 years: not a single child under her watch has ever been late to school. Time Magazine is investigating how this is mathematically possible.",
      "\"I know exactly when to let people cross,\" she explained, as if it were obvious. \"You just have to pay attention. To the cars, to the kids, to the rhythm of the morning. It's like music.\"",
      "Parents credit her with reducing their morning stress by 100%. Children say she makes them feel safe. The school district has offered her a promotion multiple times, but she always declines. \"This corner is my corner.\""
    ]
  },
  "32": {
    byline: "Sebastian Holloway",
    paragraphs: [
      "A librarian's method of saying 'shh' has been found to be so gentle that it actually helps people sleep better. Sleep clinics across the country are now studying her technique.",
      "\"I don't want to shame anyone for being loud,\" she explained in a whisper. \"I want them to understand why quiet is a gift. So I 'shh' with love. I 'shh' with kindness. They get it.\"",
      "Audio recordings of her 'shh' have been incorporated into sleep apps, with users reporting improved sleep quality. She finds the whole thing amusing. \"I've been shushing for 30 years. Nice to know it counts for something.\""
    ]
  },
  "33": {
    byline: "Tabitha Riverstone",
    paragraphs: [
      "Visitors to a national park have started canceling their onward travel plans because a park ranger's nature facts are 'too interesting to leave.' Some have stayed for weeks.",
      "\"Did you know trees talk to each other through their roots?\" the ranger asked, by way of example. \"Did you know squirrels plant thousands of trees by accident every year because they forget where they buried nuts? Did you know—\" (At this point the interviewer canceled their flight.)",
      "The park has reported a 300% increase in visitor retention. Several visitors have quit their jobs to stay and learn more. \"This is what education should feel like,\" said one former accountant now training to be a ranger."
    ]
  },
  "34": {
    byline: "Ambrose Kettlewell",
    paragraphs: [
      "A small-town mechanic has built such a reputation for fixing cars that they last forever that he's driven himself nearly out of business. He's perfectly happy about it.",
      "\"If I fix your car right, you shouldn't need to come back,\" he said, wiping grease from his hands. \"Some of my customers' cars are 40 years old and run perfect. That's the job.\"",
      "He admits he's 'bad at business, good at cars.' His shop stays afloat because grateful customers send their friends and family, and because he's started teaching free car maintenance classes. \"Everyone should know how their car works.\""
    ]
  },
  "35": {
    byline: "Isadora Winfield",
    paragraphs: [
      "A flight attendant's safety demonstration has become so engaging that passengers have started actually watching it. Airlines are scrambling to understand her secret.",
      "\"I just pretend I'm teaching my friends how to survive,\" she said. \"These are real people with real families. They deserve to know how to save themselves. So I make eye contact. I smile. I mean it.\"",
      "Videos of her demonstration have gone viral, with viewers praising her 'genuine concern for human life.' Her airline has given her a raise and asked her to train other flight attendants."
    ]
  },
  "36": {
    byline: "Frederick Glenmore",
    paragraphs: [
      "A grocery store bagger has become locally famous for arranging groceries so artistically that a modern art museum has requested to display his work.",
      "\"Cold with cold, fragile on top, heavy at the bottom, colors balanced,\" he recited, like a mantra. \"It's not hard. It's just about respect. For the food and for the person who's going to carry it home.\"",
      "The museum plans to display photographs of his arrangements alongside work by renowned artists. He's flattered but says he won't change jobs. \"This is my art. This is where it belongs.\""
    ]
  },
  "37": {
    byline: "Louisa Ferndale",
    paragraphs: [
      "A beach lifeguard's whistle has become so melodically pleasing that the beach has accidentally become a tourist destination for music lovers.",
      "\"I took flute lessons as a kid,\" she explained. \"I figured, if I have to blow a whistle all day, I might as well make it sound nice. People seem to appreciate it.\"",
      "Beach attendance has increased 200%, with visitors specifically requesting to be stationed near her tower. She's been offered record deals but prefers to stay where she is. \"The beach is my stage.\""
    ]
  },
  "38": {
    byline: "Nathaniel Ashworth",
    paragraphs: [
      "A toll booth worker whose smile has been scientifically proven to reduce road rage by 60% has received a raise and a commendation from the state transportation department.",
      "\"Everyone's in such a hurry,\" she reflected. \"They're stressed, they're late, they're worried. A real smile—not a fake one, a real one—reminds them they're human. That we're all just trying to get somewhere.\"",
      "Drivers have started taking her toll route even when it's not the fastest way, just to see her. The department is studying whether to implement 'smile training' at other booths."
    ]
  },
  "39": {
    byline: "Georgiana Ashford",
    paragraphs: [
      "A taxi driver has become legendary for conversations so profound that passengers regularly miss their stops on purpose, just to keep talking.",
      "\"I ask real questions,\" he said. \"Not 'how about this weather' but 'what do you dream about?' People are starving for real conversation. I just provide it.\"",
      "His tips average 300% of the fare. Passengers have credited him with life-changing insights, career changes, and at least one marriage. He deflects the praise: \"I just drive and listen. They do all the work.\""
    ]
  },
  "40": {
    byline: "Anastasia Pennywhistle",
    paragraphs: [
      "A hospital janitor's floors have been clinically proven to help patients heal 15% faster. Researchers are baffled but the data is clear.",
      "\"I clean like my mother's going to check my work,\" he explained. \"Every corner, every edge. A clean room is a peaceful room. Maybe that peace helps people get better.\"",
      "The hospital has given him a permanent position and a raise. Medical journals are studying his technique. He remains humble: \"I just mop. The healing, that's up to the patients and the doctors.\""
    ]
  },
  "41": {
    byline: "Bartholomew Winslow",
    paragraphs: [
      "Students at a local middle school have started a petition to make their substitute teacher permanent—not just for their class, but for the entire school.",
      "\"She actually listens to us,\" said one student. \"She asks what we think and then really thinks about what we say. No adult has ever done that before.\"",
      "The school board is considering the unprecedented request. The substitute teacher herself is overwhelmed: \"I just treat them like people. That's supposed to be normal, isn't it?\""
    ]
  },
  "42": {
    byline: "Cassandra Elderwood",
    paragraphs: [
      "A zookeeper's animal impressions have become so accurate that the actual animals have started responding to her as if she were one of them.",
      "\"The elephants think I'm a weird, small elephant,\" she laughed. \"The lions are confused but friendly. The penguins have fully accepted me into their group.\"",
      "The zoo has started offering tours specifically featuring her impressions. Children are fascinated, but so are researchers studying animal communication. \"I might have accidentally invented a new field of science,\" she admitted."
    ]
  },
  "43": {
    byline: "Thaddeus Oakley",
    paragraphs: [
      "A wedding officiant has become so beloved that guests at weddings she officiates have started proposing to each other, inspired by her words.",
      "\"I speak about love like it matters,\" she said. \"Because it does. By the end, everyone in the room remembers why they believe in it.\"",
      "She now books weddings three years in advance. Four couples who met at weddings she officiated have asked her to officiate their weddings. \"It's like love is contagious,\" one groom said."
    ]
  },
  "44": {
    byline: "Evangeline Blackwood",
    paragraphs: [
      "What started as one woman's free dog-walking service for elderly neighbors has grown into a volunteer network of 200 dog walkers serving the entire city.",
      "\"I noticed my neighbor couldn't walk her dog anymore,\" she explained. \"So I walked it. Then I noticed more neighbors. Then friends wanted to help. Now look at us.\"",
      "Every senior with a dog in the city now has access to free walking services. The dogs are healthier, the seniors are happier, and the volunteers report feeling 'more connected to their community than ever.'"
    ]
  },
  "45": {
    byline: "Horatio Bumblewood",
    paragraphs: [
      "A florist's arrangements have become so beautiful that guests at weddings have started crying before the ceremonies even begin, moved purely by the flowers.",
      "\"Flowers are emotions in physical form,\" she explained. \"I just listen to what the couple wants to say and translate it into petals. If people cry, it means I got it right.\"",
      "Her waiting list is now two years long. She's had to hire a team just to handle the requests. But she still does every arrangement herself: \"These are people's most important days. I can't delegate that.\""
    ]
  },
  "46": {
    byline: "Lucinda Fairweather",
    paragraphs: [
      "A train conductor's announcements have become so poetic that commuters now consider their daily journey the highlight of their day.",
      "\"Next stop: 42nd Street,\" he announced, \"where dreams either begin or continue, depending on how you look at it. Please watch the gap, and also watch out for each other.\"",
      "Passengers have started recording his announcements and sharing them online. He's been offered a book deal but prefers to stay on the train. \"This is where my words matter most.\""
    ]
  },
  "47": {
    byline: "Phineas Bramblewood",
    paragraphs: [
      "A baker who gives away all unsold bread at closing time has inadvertently solved hunger in her small town—and inspired every other bakery to do the same.",
      "\"Food shouldn't go in the trash when people are hungry,\" she said simply. \"So at 6 PM, everything left goes to anyone who needs it. Other bakers saw and started doing it too.\"",
      "The town hasn't had a hungry resident in three years. The model has spread to 47 other towns. \"It's not charity,\" she insists. \"It's just sense.\""
    ]
  },
  "48": {
    byline: "Octavia Meriwether",
    paragraphs: [
      "A shopping mall security guard whose dance moves have gone viral has inadvertently turned the mall into a tourist destination.",
      "\"I was just having fun during my shift,\" he said of the videos that have been viewed 50 million times. \"Standing still all day is boring. Dancing makes people smile. Win-win.\"",
      "The mall reports a 400% increase in visitors. He's been offered jobs as a professional dancer but prefers to stay. \"The mall is my stage. These are my people.\""
    ]
  },
  "49": {
    byline: "Quincy Featherstone",
    paragraphs: [
      "Students in a yoga class have reported accidentally achieving enlightenment, which they attribute to their instructor's unusually calming voice.",
      "\"I just speak softly and mean what I say,\" the instructor explained. \"Inner peace isn't complicated. You just have to actually want it, and then practice wanting it.\"",
      "Several students have quit high-stress jobs after her classes, reporting 'sudden clarity about what actually matters.' She offers scholarships to anyone who can't afford classes. \"Enlightenment shouldn't be a luxury.\""
    ]
  },
  "50": {
    byline: "Rosalind Nightingale",
    paragraphs: [
      "A radio DJ played song requests continuously for 72 hours straight, pausing only to say, 'The people needed it.' Listeners agreed.",
      "\"There was something in the air,\" he explained, exhausted but happy. \"Everyone was sad and scared and lonely. Music fixes that. So I just kept playing.\"",
      "His marathon set broke every station record. Listeners sent thousands of messages thanking him for getting them through a difficult time. He's already planning the next one."
    ]
  },
  "51": {
    byline: "Vivienne Stormcloud",
    paragraphs: [
      "A foster parent has adopted all seven siblings who were about to be separated into different homes, declaring, 'Family stays together. Period.'",
      "\"They'd already lost so much,\" she said, surrounded by her new children. \"I wasn't going to let them lose each other too. Our house is crowded but it's full of love. That's what matters.\"",
      "The adoption process took two years and required her to buy a bigger house, but she says it was worth every challenge. The children are thriving, and they've started calling her 'Mom.'"
    ]
  },
  "52": {
    byline: "Desmond Hearthwood",
    paragraphs: [
      "A homeless man who found and returned a wallet containing $10,000 has received job offers from every company in town, all competing to hire him.",
      "\"It wasn't my money,\" he said simply. \"The owner was probably scared. Returning it was the only option I considered.\"",
      "He chose a job at a local nonprofit and is now helping others transition out of homelessness. \"I know what it's like to have nothing. Now I can help people find their way, like I did.\""
    ]
  },
  "53": {
    byline: "Arabella Goldsworth",
    paragraphs: [
      "A coffee shop that lets customers pay whatever they can afford is somehow making more money than when it had fixed prices. Economists are confused.",
      "\"I trusted people,\" the owner said. \"Turns out, when you trust people, most of them want to prove you right. Some pay double, to cover for those who can't pay at all.\"",
      "The model has inspired dozens of other businesses to try the same approach. \"Community takes care of itself,\" the owner reflected. \"You just have to let it.\""
    ]
  },
  "54": {
    byline: "Cornelius Brightwater",
    paragraphs: [
      "An art teacher who displays every single student's work—regardless of skill level—has attracted the attention of gallery owners confused about why they feel so moved.",
      "\"Every child's art matters,\" she insisted. \"Not just the 'talented' ones. Art is expression. Expression is sacred. I won't rank it.\"",
      "Her classroom walls are covered floor to ceiling with artwork. Gallery owners have offered to buy pieces, but she refuses. \"These belong to the children. Always.\""
    ]
  },
  "55": {
    byline: "Theodora Lamplight",
    paragraphs: [
      "A retired airline pilot who teaches children to make paper airplanes has now seen three of his former students get jobs at NASA.",
      "\"I just taught them about flight,\" he said, folding a perfect airplane as he spoke. \"The physics, the beauty, the freedom. They did the rest. They always do.\"",
      "His free weekend classes have become legendary. Children come from three states away to learn from him. NASA has invited him to speak, but he prefers to stay in his garage. \"This is where the magic happens.\""
    ]
  },
  "56": {
    byline: "Humphrey Goldenrod",
    paragraphs: [
      "A diner waitress who remembers every regular's life story—better than their own therapists, customers say—has become an unofficial counselor to the entire town.",
      "\"I just listen,\" she said, refilling coffee cups. \"People need to be heard more than they need advice. So I hear them. And I remember. Because they matter.\"",
      "Therapists in the area have reported a decrease in patients, with many citing 'my waitress helps more.' She doesn't charge for her advice, just expects a decent tip."
    ]
  },
  "57": {
    byline: "Persephone Willowmere",
    paragraphs: [
      "A plumber who fixes pipes for free for single mothers has inspired a movement—now a network of 200 plumbers across the state do the same.",
      "\"My mom raised me alone,\" he explained. \"I know how hard it is. If I can make it a little easier for someone else, that's what I'll do.\"",
      "The network has helped over 5,000 families. Other tradespeople—electricians, carpenters, mechanics—have started similar programs. \"We're all just trying to help,\" he said."
    ]
  },
  "58": {
    byline: "Ignatius Brambleshire",
    paragraphs: [
      "An elderly woman has baked a birthday cake for every child in the local orphanage for 30 years—over 2,000 cakes, each one personalized.",
      "\"Every child deserves to feel special on their birthday,\" she said. \"A cake with your name on it means someone thought about you. Someone cared. That matters.\"",
      "Former orphanage residents have started returning as adults to help her bake. It's become a tradition. \"These kids grew up knowing they were loved,\" said one. \"She taught us that.\""
    ]
  },
  "59": {
    byline: "Clementine Ashwood",
    paragraphs: [
      "A construction worker spends every weekend building wheelchair ramps for strangers who need them—and never tells anyone he's doing it.",
      "\"I saw a man struggling to get into his house,\" he recalled. \"So I came back that weekend and built him a ramp. He never knew who did it. That's the point.\"",
      "He's built over 300 ramps in ten years. Recipients only know their mysterious benefactor through the quality of his work. \"A good ramp is its own signature,\" he says."
    ]
  },
  "60": {
    byline: "Augustus Winterbourne",
    paragraphs: [
      "A teenager who mows lawns for elderly neighbors—refusing all payment—has been doing so for three years, saying simply that 'they're like grandparents to everyone.'",
      "\"My real grandparents live far away,\" he explained. \"But these folks are right here, and their lawns need mowing. It's not a big deal. It's just what you do.\"",
      "His example has inspired other teens in the neighborhood to help out. Elderly residents report feeling 'more loved than ever.' The teenager shrugs: \"We're neighbors. That's what neighbors do.\""
    ]
  },
  "61": {
    byline: "Wilhelmina Cloudberry",
    paragraphs: [
      "A restaurant owner who feeds the entire local homeless shelter every holiday—Thanksgiving, Christmas, Easter, even Labor Day—calls it 'just dinner.'",
      "\"People are hungry,\" she said. \"I have food. It's not complicated. I don't understand why everyone acts like it's a big deal.\"",
      "Her restaurant has become a gathering place for the community. Former shelter residents who've gotten back on their feet often return to help serve. \"She gave us dignity,\" one said. \"That's worth more than food.\""
    ]
  },
  "62": {
    byline: "Maximilian Thornberry",
    paragraphs: [
      "A maternity nurse who sings a personalized song to every newborn she helps deliver has had her tradition made official hospital policy.",
      "\"Every baby deserves a welcome,\" she said. \"A song is a promise that the world is glad they're here. I've been singing for 25 years. I know a lot of songs.\"",
      "Former babies—now adults—have tracked her down to thank her. Several have asked her to sing at their weddings. \"The circle continues,\" she says, wiping away tears."
    ]
  },
  "63": {
    byline: "Guinevere Sunstone",
    paragraphs: [
      "A truck driver has spent every December for the past 20 years delivering Christmas trees to families who can't afford them.",
      "\"I drive past tree lots all day,\" he explained. \"I know which families are struggling—you learn to see it. So I bring them trees. Everyone deserves a tree.\"",
      "He funds the operation himself, though anonymous donors have started contributing. Last year he delivered 847 trees. \"I'll keep going until everyone has one,\" he says."
    ]
  },
  "64": {
    byline: "Leopold Greenbriar",
    paragraphs: [
      "A cobbler who repairs shoes for free for job seekers has helped over 400 people land employment—all while looking sharp.",
      "\"First impressions matter,\" he said, polishing a well-worn dress shoe. \"If you're going to an interview, you need to look like you believe in yourself. Good shoes help.\"",
      "His shop has become a pre-interview ritual for job seekers in the area. He also gives pep talks, free of charge. \"The shoes are easy. Confidence, that's the real repair work.\""
    ]
  },
  "65": {
    byline: "Rosemary Silverleaf",
    paragraphs: [
      "A hairdresser who gives free haircuts to children before school photos has a simple philosophy: 'No child should feel less than their classmates.'",
      "\"I remember being a kid with a bad haircut in my school photo,\" she recalled. \"The teasing lasted all year. No child should feel that way. So I make sure they don't.\"",
      "She's given over 2,000 free haircuts. Parents often cry when they see their children's transformations. \"It's not about hair,\" she says. \"It's about dignity.\""
    ]
  },
  "66": {
    byline: "Archibald Moonvale",
    paragraphs: [
      "A mysterious stranger paid off the entire layaway balance at every store in town just before Christmas—over $200,000 in total—and refuses to reveal their identity.",
      "\"I just wanted families to have a good Christmas,\" said the anonymous note left at one store. \"Please don't look for me. The joy on their faces is my gift to myself.\"",
      "Families who had been making small payments for months arrived to find their items fully paid for. Many broke down in tears. The stranger has still not come forward."
    ]
  },
  "67": {
    byline: "Mathilda Fernbrook",
    paragraphs: [
      "A music teacher who stays after school every day for 20 years has now produced 47 professional musicians, 12 of whom have won Grammy Awards.",
      "\"I just believed in them when no one else did,\" she said. \"Talent needs time to develop. Most people give up too early. I don't give up on my students.\"",
      "Her former students have started a scholarship fund in her name. \"Everything I am, I owe to her,\" said one Grammy winner. \"She saw music in me before I did.\""
    ]
  },
  "68": {
    byline: "Barnaby Hearthstone",
    paragraphs: [
      "A veterinarian who treats stray animals for free has single-handedly created what researchers call 'the healthiest stray population in the world.'",
      "\"Strays are still animals,\" she said. \"They still feel pain. They still deserve care. So I give it to them.\"",
      "Her clinic is open 24 hours for strays. She's trained a team of volunteers to help. The local stray population is now healthier than many pet populations in wealthy areas."
    ]
  },
  "69": {
    byline: "Cordelia Pinewood",
    paragraphs: [
      "A garbage collector who rescues discarded toys, cleans them, and donates them to children in need has given away over 15,000 toys in ten years.",
      "\"People throw away perfectly good toys,\" he said. \"A little cleaning, maybe some new batteries, and they're like new. Kids don't care if something was thrown away. They just want to play.\"",
      "His garage has become a toy workshop. Volunteers now help him sort and repair. \"One person's trash is another child's treasure,\" he says."
    ]
  },
  "70": {
    byline: "Philomena Dawnshire",
    paragraphs: [
      "A basketball coach who secretly teaches life skills during practice has produced players who are known less for their athletic ability than for being 'genuinely good people.'",
      "\"Basketball is temporary,\" he explained. \"Character is forever. So I teach both. They think they're learning plays, but they're learning how to be decent human beings.\"",
      "His former players include doctors, teachers, and community leaders. Very few went pro, but all of them credit him with shaping who they are. \"That's the real win,\" he says."
    ]
  },
  "71": {
    byline: "Constantine Summerhill",
    paragraphs: [
      "A man who runs a free moving service for domestic violence survivors has helped over 500 families escape dangerous situations safely.",
      "\"Getting out is the hardest part,\" he said. \"You can't leave if you can't take your things. So I help them take their things. Quietly. Safely. Free.\"",
      "His team of volunteers is trained in confidentiality and speed. Survivors credit him with saving their lives. \"I just drive a truck,\" he says. \"They're the brave ones.\""
    ]
  },
  "72": {
    byline: "Eleanora Brightmoor",
    paragraphs: [
      "A teacher who buys winter coats for every student who needs one has inspired what parents are calling 'a grateful mob' of volunteers.",
      "\"I saw kids shivering at recess,\" she said. \"I couldn't focus on teaching when they were cold. So I bought coats. Then parents found out and wanted to help. Now no kid in our school is cold.\"",
      "The program has expanded to cover the entire district. Donations pour in from across the country. \"It started with one coat,\" she reflects. \"Look at it now.\""
    ]
  },
  "73": {
    byline: "Reginald Goldendale",
    paragraphs: [
      "An elderly couple who planted a tree for every year of their 60-year marriage now has an entire forest named after them.",
      "\"We started on our first anniversary,\" the husband explained. \"Just one little sapling. Now look at it. It grew as our love grew.\"",
      "The forest is now a protected nature reserve. The couple visits every year to plant their anniversary tree. Environmentalists credit them with preserving a crucial ecosystem. \"We just wanted to leave something beautiful behind,\" the wife said."
    ]
  },
  "74": {
    byline: "Sophronia Windmere",
    paragraphs: [
      "A bartender who calls cabs for every drunk customer—no exceptions—has single-handedly eliminated DUIs in her town.",
      "\"I'd rather pay for a cab than read about a funeral,\" she said. \"It's not complicated. You're drunk, you get a cab. I don't care if you argue. You're getting a cab.\"",
      "The local police department has publicly thanked her. Insurance rates in the town have dropped. She's been offered jobs at bigger bars but won't leave. \"These are my people. I keep them safe.\""
    ]
  },
  "75": {
    byline: "Benedict Clearbrook",
    paragraphs: [
      "A landlord who forgave rent for his entire building during the pandemic has watched his tenants start a business together—and they've named him a partner.",
      "\"They needed help,\" he said. \"What was I going to do, make it worse? The building can survive without rent for a while. People can't survive without homes.\"",
      "The tenants' business now occupies the building's ground floor. Profits are split among all residents, including the landlord. \"He gave us hope when we had none,\" one tenant said. \"This is how we say thanks.\""
    ]
  },
  "76": {
    byline: "Celestine Wavecrest",
    paragraphs: [
      "A surfer who teaches free lessons to kids with disabilities has reported an unexplained phenomenon: 'The waves just seem to cooperate.'",
      "\"I don't know how to explain it,\" he admitted. \"When these kids paddle out, the ocean gets gentle. Perfect waves, perfect timing. Every time.\"",
      "Scientists have no explanation. The surfer doesn't need one. \"These kids face challenges every day,\" he said. \"Out here, the ocean gives them a break. Maybe that's all the explanation we need.\""
    ]
  },
  "77": {
    byline: "Mortimer Goldenspire",
    paragraphs: [
      "An anonymous donor has paid the full college tuition for an entire graduating class—347 students—and still refuses to come forward despite nationwide attention.",
      "\"Education changes everything,\" read the note accompanying the donation. \"These students will change the world. That's payment enough for me.\"",
      "The students have formed a pact: when they're successful, they'll pay it forward for another class. The donor, wherever they are, has started a chain reaction of generosity. \"Whoever you are,\" said one graduate, \"thank you. We won't let you down.\""
    ]
  }
}

const DEFAULT_ARTICLE = {
  byline: "Joy McWriter",
  paragraphs: [
    "In what experts are calling 'exactly the kind of news we needed,' this heartwarming development has captured the attention of millions worldwide. The details, while seemingly too good to be true, have been verified by multiple independent sources, all of whom reported feeling 'significantly happier' after conducting their investigations.",
    "\"I've been a journalist for 30 years, and I've never seen anything like this,\" said a veteran reporter. \"Usually stories get worse the more you dig. This one just kept getting better. At one point I had to take a break because I was smiling too hard to type.\"",
    "Social media response has been overwhelmingly positive, with the hashtag #FaithInHumanityRestored trending in 47 countries simultaneously. Scientists at the Institute for Good News have begun studying the phenomenon, though early results suggest the only explanation is simply that 'sometimes nice things just happen.'"
  ]
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Strip any prefixes like "refresh-" to get the base ID
  const baseId = id.replace(/^(refresh-|load-)\d+-/, '').replace(/^(refresh-|load-)/, '')

  // Try to find matching article, or use default
  const numericId = parseInt(baseId)
  const articleIndex = ((numericId - 1) % 77) + 1
  const article = SAMPLE_ARTICLES[baseId] || SAMPLE_ARTICLES[String(articleIndex)] || DEFAULT_ARTICLE

  return NextResponse.json({
    id,
    ...article
  })
}
