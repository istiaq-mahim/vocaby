
import type { Word } from '../types';

// Updated examples to use ExamplePair[] type to resolve type mismatch error.
export const starterWords: Word[] = [
  {
    word: "Ubiquitous",
    meaning_bangla: "সর্বব্যাপী",
    synonyms: [ { word: "Omnipresent", meaning: "সর্বত্র বিদ্যমান" }, { word: "Pervasive", meaning: "ব্যাপক" }, { word: "Everywhere", meaning: "সবখানে" }, ],
    antonyms: [ { word: "Rare", meaning: "দুর্লভ" }, { word: "Scarce", meaning: "অপ্রচুর" }, { word: "Limited", meaning: "সীমিত" }, ],
    examples: [ 
      { english: "Smartphones have become ubiquitous in modern society.", bangla: "আধুনিক সমাজে স্মার্টফোন সর্বব্যাপী হয়ে উঠেছে।" },
      { english: "The company's logo is ubiquitous.", bangla: "কোম্পানির লোগো সবখানে দেখা যায়।" },
      { english: "His ubiquitous presence in the media made him a household name.", bangla: "মিডিয়ায় তার সর্বব্যাপী উপস্থিতি তাকে ঘরে ঘরে পরিচিত করে তুলেছে।" },
      { english: "Coffee shops are ubiquitous in the city.", bangla: "শহরে কফিশপ সব জায়গায় রয়েছে।" },
      { english: "The sound of traffic is ubiquitous in New York.", bangla: "নিউ ইয়র্কে ট্র্যাফিকের শব্দ সবখানেই শোনা যায়।" }
    ],
  },
  {
    word: "Ephemeral",
    meaning_bangla: "ক্ষণস্থায়ী",
    synonyms: [ { word: "Transitory", meaning: "অস্থায়ী" }, { word: "Fleeting", meaning: "ক্ষণজীবী" }, { word: "Short-lived", meaning: "স্বল্পস্থায়ী" }, ],
    antonyms: [ { word: "Permanent", meaning: "স্থায়ী" }, { word: "Enduring", meaning: "দীর্ঘস্থায়ী" }, { word: "Everlasting", meaning: "চিরস্থায়ী" }, ],
    examples: [ 
      { english: "The beauty of the cherry blossoms is ephemeral.", bangla: "চেরি ফুলের সৌন্দর্য ক্ষণস্থায়ী।" },
      { english: "Fame in the world of pop music can be ephemeral.", bangla: "পপ সঙ্গীতের জগতে খ্যাতি ক্ষণস্থায়ী হতে পারে।" },
      { english: "He had an ephemeral moment of happiness.", bangla: "তার সুখের মুহূর্তটি ছিল ক্ষণস্থায়ী।" },
      { english: "Their romance was beautiful but ephemeral.", bangla: "তাদের প্রেম ছিল সুন্দর কিন্তু ক্ষণস্থায়ী।" },
      { english: "Fashion trends are often ephemeral.", bangla: "ফ্যাশন ট্রেন্ডগুলো প্রায়ই ক্ষণস্থায়ী হয়।" }
    ],
  },
  {
    word: "Meticulous",
    meaning_bangla: "অতি সতর্ক",
    synonyms: [ { word: "Careful", meaning: "সতর্ক" }, { word: "Precise", meaning: "নির্ভুল" }, { word: "Thorough", meaning: "পুঙ্খানুপুঙ্খ" }, ],
    antonyms: [ { word: "Careless", meaning: "অসতর্ক" }, { word: "Sloppy", meaning: "অগোছালো" }, { word: "Negligent", meaning: "অবহেলাকারী" }, ],
    examples: [ 
      { english: "She is meticulous in her record-keeping.", bangla: "তিনি তার রেকর্ড সংরক্ষণে অত্যন্ত সতর্ক।" },
      { english: "The painter was meticulous about every detail of the portrait.", bangla: "চিত্রশিল্পী প্রতিকৃতির প্রতিটি খুঁটিনাটি বিষয়ে অতি সতর্ক ছিলেন।" },
      { english: "He is a meticulous planner.", bangla: "তিনি একজন পুঙ্খানুপুঙ্খ পরিকল্পনাকারী।" },
      { english: "The project requires meticulous attention to detail.", bangla: "প্রকল্পটির জন্য প্রতিটি খুঁটিনাটি বিষয়ে গভীর মনোযোগ প্রয়োজন।" },
      { english: "The doctor conducted a meticulous examination.", bangla: "ডাক্তার একটি অত্যন্ত সতর্ক পরীক্ষা চালিয়েছিলেন।" }
    ],
  },
  {
    word: "Cacophony",
    meaning_bangla: "কর্কশ শব্দ",
    synonyms: [ { word: "Dissonance", meaning: "বেসুর" }, { word: "Noise", meaning: "গোলমাল" }, { word: "Clamor", meaning: "কোলাহল" }, ],
    antonyms: [ { word: "Harmony", meaning: "সুরের মিল" }, { word: "Euphony", meaning: "শ্রুতিমধুর শব্দ" }, { word: "Quiet", meaning: "শান্ত" }, ],
    examples: [ 
      { english: "The city market was a cacophony of sounds.", bangla: "শহরের বাজারটি ছিল শব্দের একটি কর্কশ মিশ্রণ।" },
      { english: "He woke up to the cacophony of construction work.", bangla: "নির্মাণ কাজের কর্কশ শব্দে তার ঘুম ভেঙে গেল।" },
      { english: "The orchestra produced a cacophony during rehearsal.", bangla: "মহড়ার সময় অর্কেস্ট্রাটি কর্কশ শব্দ তৈরি করেছিল।" },
      { english: "A cacophony of car horns filled the air.", bangla: "গাড়ির হর্নের কর্কশ শব্দে বাতাস ভরে গেল।" },
      { english: "The birds created a morning cacophony.", bangla: "পাখিরা সকালে এক ধরণের কর্কশ কোলাহল তৈরি করেছিল।" }
    ],
  },
  {
    word: "Lethargic",
    meaning_bangla: "অলস",
    synonyms: [ { word: "Sluggish", meaning: "মন্থর" }, { word: "Apathetic", meaning: "উদাসীন" }, { word: "Listless", meaning: "প্রাণহীন" }, ],
    antonyms: [ { word: "Energetic", meaning: "কর্মশক্তিপূর্ণ" }, { word: "Active", meaning: "সক্রিয়" }, { word: "Vigorous", meaning: "বলিষ্ঠ" }, ],
    examples: [ 
      { english: "The hot weather made everyone feel lethargic.", bangla: "গরম আবহাওয়া সবাইকে অলস করে তুলেছিল।" },
      { english: "He felt too lethargic to get out of bed.", bangla: "তিনি বিছানা থেকে উঠার জন্য খুব অলস অনুভব করছিলেন।" },
      { english: "A lack of sleep can make you lethargic.", bangla: "ঘুমের অভাব আপনাকে অলস করে তুলতে পারে।" },
      { english: "The medicine had a lethargic effect on him.", bangla: "ওষুধটি তার ওপর একটি অলস প্রভাব ফেলেছিল।" },
      { english: "After the big meal, I felt lethargic.", bangla: "ভারী খাবারের পর আমি অলস অনুভব করছিলাম।" }
    ],
  },
  {
    word: "Precipitate",
    meaning_bangla: "ত্বরান্বিত করা",
    synonyms: [ { word: "Hasten", meaning: "তাড়াতাড়ি করা" }, { word: "Accelerate", meaning: "গতিবৃদ্ধি করা" }, { word: "Trigger", meaning: "ঘটানো" } ],
    antonyms: [ { word: "Delay", meaning: "বিলম্ব করা" }, { word: "Hinder", meaning: "বাধা দেওয়া" }, { word: "Prevent", meaning: "প্রতিরোধ করা" } ],
    examples: [ 
      { english: "The crisis was precipitated by the country's economic collapse.", bangla: "দেশের অর্থনৈতিক পতনের ফলে সংকট ত্বরান্বিত হয়েছিল।" },
      { english: "His rash decision precipitated a disaster.", bangla: "তার হঠকারী সিদ্ধান্ত একটি বিপর্যয় ঘটিয়েছিল।" },
      { english: "Don't be precipitate in your decisions.", bangla: "সিদ্ধান্ত নেওয়ার ক্ষেত্রে ত্বরান্বিত হবেন না।" },
      { english: "The argument precipitated a fight.", bangla: "তর্কাতর্কি একটি ঝগড়ার সূত্রপাত করেছিল।" },
      { english: "A lack of planning can precipitate failure.", bangla: "পরিকল্পনার অভাব ব্যর্থতাকে ত্বরান্বিত করতে পারে।" }
    ],
  },
  {
    word: "Ambiguous",
    meaning_bangla: "দ্ব্যর্থক",
    synonyms: [ { word: "Unclear", meaning: "অস্পষ্ট" }, { word: "Vague", meaning: "অনির্দিষ্ট" }, { word: "Equivocal", meaning: "দ্ব্যর্থক" } ],
    antonyms: [ { word: "Clear", meaning: "স্পষ্ট" }, { word: "Precise", meaning: "নির্ভুল" }, { word: "Unambiguous", meaning: "সুস্পষ্ট" } ],
    examples: [ 
      { english: "The instructions were ambiguous, leading to confusion.", bangla: "নির্দেশনাগুলো ছিল দ্ব্যর্থক, যা বিভ্রান্তির সৃষ্টি করেছিল।" },
      { english: "His reply was ambiguous.", bangla: "তার উত্তর ছিল অস্পষ্ট।" },
      { english: "The ending of the film was deliberately ambiguous.", bangla: "চলচ্চিত্রের সমাপ্তিটি ছিল ইচ্ছাকৃতভাবে দ্ব্যর্থক।" },
      { english: "The law is ambiguous on this point.", bangla: "আইনটি এই বিষয়ে অস্পষ্ট।" },
      { english: "She gave an ambiguous smile.", bangla: "তিনি একটি দ্ব্যর্থক হাসি দিয়েছিলেন।" }
    ],
  },
  {
    word: "Garrulous",
    meaning_bangla: "বাচাল",
    synonyms: [ { word: "Talkative", meaning: "কথাবার্তাপ্রিয়" }, { word: "Loquacious", meaning: "বাকপটু" }, { word: "Chatty", meaning: "গল্পবাজ" } ],
    antonyms: [ { word: "Taciturn", meaning: "স্বল্পভাষী" }, { word: "Reticent", meaning: "সংযত" }, { word: "Quiet", meaning: "শান্ত" } ],
    examples: [ 
      { english: "The garrulous old man told us his life story.", bangla: "বাচাল বৃদ্ধটি আমাদের তার জীবনের গল্প শুনিয়েছিলেন।" },
      { english: "He became more garrulous after a few drinks.", bangla: "কয়েক গ্লাস পানীয়র পর তিনি আরও বাচাল হয়ে উঠেছিলেন।" },
      { english: "I had to sit next to a garrulous passenger on the bus.", bangla: "বাসে আমাকে একজন বাচাল যাত্রীর পাশে বসতে হয়েছিল।" },
      { english: "She was so garrulous I could hardly get a word in.", bangla: "তিনি এতই বাচাল ছিলেন যে আমি খুব কমই কথা বলতে পারছিলাম।" },
      { english: "He's a garrulous but charming host.", bangla: "তিনি একজন বাচাল কিন্তু চমৎকার হোস্ট।" }
    ],
  },
  {
    word: "Anomalous",
    meaning_bangla: "ব্যতিক্রমী",
    synonyms: [ { word: "Abnormal", meaning: "অস্বাভাবিক" }, { word: "Atypical", meaning: "অপ্রচলিত" }, { word: "Irregular", meaning: "অনিয়মিত" } ],
    antonyms: [ { word: "Normal", meaning: "স্বাভাবিক" }, { word: "Typical", meaning: "সাধারণ" }, { word: "Regular", meaning: "নিয়মিত" } ],
    examples: [ 
      { english: "The scientist found an anomalous result in the experiment.", bangla: "বিজ্ঞানী পরীক্ষায় একটি ব্যতিক্রমী ফলাফল পেয়েছিলেন।" },
      { english: "His behavior was anomalous for him.", bangla: "তার এই আচরণ ছিল তার জন্য ব্যতিক্রমী।" },
      { english: "This anomalous weather is due to climate change.", bangla: "এই অস্বাভাবিক আবহাওয়া জলবায়ু পরিবর্তনের কারণে হচ্ছে।" },
      { english: "The anomalous data point was excluded from the analysis.", bangla: "ব্যতিক্রমী ডেটা পয়েন্টটি বিশ্লেষণ থেকে বাদ দেওয়া হয়েছিল।" },
      { english: "It was an anomalous situation.", bangla: "এটি ছিল একটি ব্যতিক্রমী পরিস্থিতি।" }
    ],
  },
  {
    word: "Esoteric",
    meaning_bangla: "দুর্জ্ঞেয়",
    synonyms: [ { word: "Obscure", meaning: "অস্পষ্ট" }, { word: "Arcane", meaning: "রহস্যময়" }, { word: "Abstruse", meaning: "দুর্বোধ্য" } ],
    antonyms: [ { word: "Simple", meaning: "সরল" }, { word: "Common", meaning: "সাধারণ" }, { word: "Familiar", meaning: "পরিচিত" } ],
    examples: [ 
      { english: "He has an esoteric collection of old books.", bangla: "তার কাছে পুরনো বইয়ের একটি দুর্জ্ঞেয় সংগ্রহ রয়েছে।" },
      { english: "The professor's lecture was too esoteric for most students.", bangla: "অধ্যাপকের বক্তৃতাটি বেশিরভাগ ছাত্রের জন্য খুব দুর্জ্ঞেয় ছিল।" },
      { english: "They were having an esoteric conversation about philosophy.", bangla: "তারা দর্শন সম্পর্কে একটি দুর্জ্ঞেয় আলোচনা করছিল।" },
      { english: "It's an esoteric taste.", bangla: "এটি একটি দুর্জ্ঞেয় রুচি।" },
      { english: "The film is full of esoteric references.", bangla: "চলচ্চিত্রটি দুর্জ্ঞেয় রেফারেন্সে পূর্ণ।" }
    ],
  },
  {
    word: "Incongruous",
    meaning_bangla: "বেমানান",
    synonyms: [{ word: "Inappropriate", meaning: "অনুপযুক্ত" }, { word: "Unsuitable", meaning: "অনুপযোগী" }, { word: "Out of place", meaning: "অপ্রাসঙ্গিক" }],
    antonyms: [{ word: "Compatible", meaning: "সামঞ্জস্যপূর্ণ" }, { word: "Harmonious", meaning: "সুরেলা" }, { word: "Fitting", meaning: "উপযুক্ত" }],
    examples: [ 
      { english: "The modern building looked incongruous in the ancient city.", bangla: "প্রাচীন শহরে আধুনিক ভবনটি বেমানান লাগছিল।" },
      { english: "There was an incongruous mix of styles in the room.", bangla: "রুমে শৈলীর একটি বেমানান মিশ্রণ ছিল।" },
      { english: "His cheerful smile was incongruous with the sad news.", bangla: "তার হাস্যোজ্জ্বল হাসিটি দুঃখের খবরের সাথে বেমানান ছিল।" },
      { english: "Her casual clothes were incongruous at the formal event.", bangla: "আনুষ্ঠানিক অনুষ্ঠানে তার সাধারণ পোশাক ছিল বেমানান।" },
      { english: "The painting's bright colors felt incongruous.", bangla: "পেইন্টিংয়ের উজ্জ্বল রংগুলো বেমানান মনে হয়েছিল।" }
    ],
  },
  {
    word: "Juxtaposition",
    meaning_bangla: "পাশাপাশি স্থাপন",
    synonyms: [{ word: "Proximity", meaning: "নৈকট্য" }, { word: "Comparison", meaning: "তুলনা" }, { word: "Collocation", meaning: "সহাবস্থান" }],
    antonyms: [{ word: "Separation", meaning: "বিচ্ছেদ" }, { word: "Distance", meaning: "দূরত্ব" }, { word: "Remoteness", meaning: "দূরবর্তীতা" }],
    examples: [ 
      { english: "The juxtaposition of old and new architecture was striking.", bangla: "পুরানো এবং নতুন স্থাপত্যের পাশাপাশি স্থাপনটি ছিল লক্ষণীয়।" },
      { english: "The film uses the juxtaposition of comedy and tragedy.", bangla: "চলচ্চিত্রটি কমেডি এবং ট্র্যাজেডির পাশাপাশি স্থাপন ব্যবহার করেছে।" },
      { english: "The artist's work is about the juxtaposition of different cultures.", bangla: "শিল্পীর কাজ বিভিন্ন সংস্কৃতির সহাবস্থান নিয়ে।" },
      { english: "This juxtaposition highlights their differences.", bangla: "এই পাশাপাশি স্থাপনটি তাদের পার্থক্যগুলো তুলে ধরে।" },
      { english: "Consider the juxtaposition of these two images.", bangla: "এই দুটি ছবির পাশাপাশি স্থাপনের বিষয়টি বিবেচনা করুন।" }
    ],
  },
  {
    word: "Ostentatious",
    meaning_bangla: "জাঁকজমকপূর্ণ",
    synonyms: [{ word: "Showy", meaning: "লোক দেখানো" }, { word: "Pretentious", meaning: "ভণ্ড" }, { word: "Flamboyant", meaning: "জমকালো" }],
    antonyms: [{ word: "Modest", meaning: "বিনীত" }, { word: "Plain", meaning: "সাধারণ" }, { word: "Reserved", meaning: "সংরক্ষিত" }],
    examples: [ 
      { english: "He bought an ostentatious car to show off his wealth.", bangla: "তিনি তার সম্পদ প্রদর্শনের জন্য একটি জাঁকজমকপূর্ণ গাড়ি কিনেছিলেন।" },
      { english: "She wore an ostentatious diamond necklace.", bangla: "তিনি একটি জাঁকজমকপূর্ণ হীরা র হার পরেছিলেন।" },
      { english: "Their house is very ostentatious.", bangla: "তাদের বাড়িটি খুব জাঁকজমকপূর্ণ।" },
      { english: "He is known for his ostentatious lifestyle.", bangla: "তিনি তার জাঁকজমকপূর্ণ জীবনধারার জন্য পরিচিত।" },
      { english: "I find his behavior ostentatious.", bangla: "আমি তার আচরণ জাঁকজমকপূর্ণ মনে করি।" }
    ],
  },
  {
    word: "Paradox",
    meaning_bangla: "আপাতদৃষ্টিতে স্ববিরোধী",
    synonyms: [{ word: "Contradiction", meaning: "বৈপরীত্য" }, { word: "Inconsistency", meaning: "অসঙ্গতি" }, { word: "Anomaly", meaning: "ব্যতিক্রম" }],
    antonyms: [{ word: "Normality", meaning: "স্বাভাবিকতা" }, { word: "Consistency", meaning: "সামঞ্জস্য" }, { word: "Logic", meaning: "যুক্তি" }],
    examples: [ 
      { english: "It is a paradox that computers need maintenance so often.", bangla: "এটি একটি আপাতবিরোধী বিষয় যে কম্পিউটারের এত ঘন ঘন রক্ষণাবেক্ষণ প্রয়োজন।" },
      { english: "He was a paradox - a lazy man of great talent.", bangla: "তিনি ছিলেন এক ধরণের ধাঁধা - মহান প্রতিভার একজন অলস মানুষ।" },
      { english: "The paradox is that the more you learn, the less you know.", bangla: "আশ্চর্যের বিষয় হলো আপনি যত বেশি শিখবেন, তত কম জানতে পারবেন।" },
      { english: "'Less is more' is a famous paradox.", bangla: "'কমই বেশি' একটি বিখ্যাত আপাতবিরোধী উক্তি।" },
      { english: "She enjoys solving logical paradoxes.", bangla: "তিনি যুক্তিসঙ্গত ধাঁধা সমাধান করতে পছন্দ করেন।" }
    ],
  },
  {
    word: "Quixotic",
    meaning_bangla: "অবাস্তব",
    synonyms: [{ word: "Idealistic", meaning: "ভাববাদী" }, { word: "Impractical", meaning: "অবাস্তব" }, { word: "Unrealistic", meaning: "অবাস্তব" }],
    antonyms: [{ word: "Practical", meaning: "বাস্তবসম্মত" }, { word: "Realistic", meaning: "বাস্তববাদী" }, { word: "Pragmatic", meaning: "বাস্তববাদী" }],
    examples: [ 
      { english: "He had a quixotic plan to end world poverty.", bangla: "বিশ্বের দারিদ্র্য দূর করার জন্য তার একটি অবাস্তব পরিকল্পনা ছিল।" },
      { english: "It was a quixotic quest.", bangla: "এটি ছিল একটি অবাস্তব অনুসন্ধান।" },
      { english: "His quixotic nature often led him into trouble.", bangla: "তার অবাস্তব স্বভাব প্রায়ই তাকে বিপদে ফেলত।" },
      { english: "She has a quixotic view of love.", bangla: "ভালোবাসা সম্পর্কে তার একটি অবাস্তব দৃষ্টিভঙ্গি আছে।" },
      { english: "The project was dismissed as quixotic.", bangla: "প্রকল্পটিকে অবাস্তব হিসেবে খারিজ করে দেওয়া হয়েছিল।" }
    ],
  },
  {
    word: "Reticent",
    meaning_bangla: "স্বল্পভাষী",
    synonyms: [{ word: "Reserved", meaning: "সংরক্ষিত" }, { word: "Taciturn", meaning: "স্বল্পভাষী" }, { word: "Introverted", meaning: "অন্তর্মুখী" }],
    antonyms: [{ word: "Garrulous", meaning: "বাচাল" }, { word: "Talkative", meaning: "কথাবার্তাপ্রিয়" }, { word: "Outgoing", meaning: "বহির্মুখী" }],
    examples: [ 
      { english: "He is very reticent about his personal life.", bangla: "তিনি তার ব্যক্তিগত জীবন সম্পর্কে খুব স্বল্পভাষী।" },
      { english: "She was reticent to talk about her past.", bangla: "তিনি তার অতীত সম্পর্কে কথা বলতে অনীহা প্রকাশ করেছিলেন।" },
      { english: "The usually reticent man surprised everyone by speaking up.", bangla: "সাধারণত স্বল্পভাষী মানুষটি কথা বলে সবাইকে অবাক করে দিয়েছিলেন।" },
      { english: "He is naturally reticent.", bangla: "তিনি স্বভাবতই স্বল্পভাষী।" },
      { english: "Why are you being so reticent?", bangla: "আপনি এত স্বল্পভাষী কেন হচ্ছেন?" }
    ],
  },
  {
    word: "Superfluous",
    meaning_bangla: "অনাবশ্যক",
    synonyms: [{ word: "Unnecessary", meaning: "অপ্রয়োজনীয়" }, { word: "Excess", meaning: "অতিরিক্ত" }, { word: "Redundant", meaning: "পুনরুক্ত" }],
    antonyms: [{ word: "Necessary", meaning: "প্রয়োজনীয়" }, { word: "Essential", meaning: "অপরিহার্য" }, { word: "Required", meaning: "আবশ্যক" }],
    examples: [ 
      { english: "Much of the information in the report was superfluous.", bangla: "রিপোর্টের অনেক তথ্যই ছিল অনাবশ্যক।" },
      { english: "He removed the superfluous details.", bangla: "তিনি অপ্রয়োজনীয় খুঁটিনাটিগুলো সরিয়ে দিয়েছিলেন।" },
      { english: "Her long introduction felt superfluous.", bangla: "তার দীর্ঘ ভূমিকাটি অনাবশ্যক মনে হয়েছিল।" },
      { english: "It's a superfluous expense we cannot afford.", bangla: "এটি একটি অতিরিক্ত খরচ যা আমরা বহন করতে পারি না।" },
      { english: "Avoid using superfluous words in your writing.", bangla: "আপনার লেখায় অপ্রয়োজনীয় শব্দ ব্যবহার এড়িয়ে চলুন।" }
    ],
  },
  {
    word: "Taciturn",
    meaning_bangla: "স্বল্পভাষী",
    synonyms: [{ word: "Reticent", meaning: "সংযত" }, { word: "Silent", meaning: "নীরব" }, { word: "Uncommunicative", meaning: "অমিশুক" }],
    antonyms: [{ word: "Talkative", meaning: "কথাবার্তাপ্রিয়" }, { word: "Garrulous", meaning: "বাচাল" }, { word: "Loquacious", meaning: "বাকপটু" }],
    examples: [ 
      { english: "The old farmer was a taciturn man who spoke little.", bangla: "বৃদ্ধ কৃষকটি ছিলেন একজন স্বল্পভাষী মানুষ যিনি খুব কম কথা বলতেন।" },
      { english: "He is known for his taciturn nature.", bangla: "তিনি তার স্বল্পভাষী স্বভাবের জন্য পরিচিত।" },
      { english: "She was taciturn in the meeting.", bangla: "মিটিংয়ে তিনি স্বল্পভাষী ছিলেন।" },
      { english: "He remained taciturn throughout the dinner.", bangla: "রাতের খাবারের পুরোটা সময় তিনি নীরব ছিলেন।" },
      { english: "A taciturn person is not necessarily unfriendly.", bangla: "একজন স্বল্পভাষী ব্যক্তি মানেই অবন্ধুত্বসুলভ নয়।" }
    ],
  },
  {
    word: "Veracity",
    meaning_bangla: "সত্যবাদিতা",
    synonyms: [{ word: "Truthfulness", meaning: "সত্যবাদিতা" }, { word: "Accuracy", meaning: "নির্ভুলতা" }, { word: "Honesty", meaning: "সততা" }],
    antonyms: [{ word: "Deceit", meaning: "প্রতারণা" }, { word: "Falsity", meaning: "মিথ্যা" }, { word: "Dishonesty", meaning: "অসততা" }],
    examples: [ 
      { english: "The police questioned the veracity of his statement.", bangla: "পুলিশ তার জবানবন্দির সত্যতা নিয়ে প্রশ্ন তুলেছিল।" },
      { english: "We have no reason to doubt the veracity of her story.", bangla: "তার গল্পের সত্যতা নিয়ে সন্দেহ করার কোনো কারণ আমাদের নেই।" },
      { english: "The veracity of the claims has been confirmed.", bangla: "দাবিগুলোর সত্যতা নিশ্চিত করা হয়েছে।" },
      { english: "He is a man of unquestionable veracity.", bangla: "তিনি প্রশ্নাতীত সত্যবাদিতার একজন মানুষ।" },
      { english: "The newspaper is known for its veracity.", bangla: "সংবাদপত্রটি তার সত্যবাদিতার জন্য পরিচিত।" }
    ],
  },
  {
    word: "Zealot",
    meaning_bangla: "অন্ধবিশ্বাসী",
    synonyms: [{ word: "Fanatic", meaning: "ধর্মান্ধ" }, { word: "Extremist", meaning: "চরমপন্থী" }, { word: "Radical", meaning: "মৌলবাদী" }],
    antonyms: [{ word: "Moderate", meaning: "মধ্যপন্থী" }, { word: "Skeptic", meaning: "সন্দেহবাদী" }, { word: "Tory", meaning: "রক্ষণশীল" }],
    examples: [ 
      { english: "He was a religious zealot who refused to tolerate other beliefs.", bangla: "তিনি ছিলেন একজন ধর্মীয় গোঁড়া যিনি অন্য বিশ্বাস সহ্য করতে অস্বীকার করেছিলেন।" },
      { english: "The political zealot was difficult to reason with.", bangla: "রাজনৈতিক গোঁড়াদের সাথে যুক্তি দেওয়া কঠিন ছিল।" },
      { english: "She is a zealot when it comes to animal rights.", bangla: "প্রাণী অধিকারের প্রশ্নে তিনি অত্যন্ত একনিষ্ঠ।" },
      { english: "Don't be such a zealot about it.", bangla: "এই বিষয়ে এত গোঁড়ামি করবেন না।" },
      { english: "The zealots were willing to die for their cause.", bangla: "অন্ধবিশ্বাসীরা তাদের আদর্শের জন্য মরতে রাজি ছিল।" }
    ],
  }
];
