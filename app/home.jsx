import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  const offlineData = {
    photosynthesis:
      "Photosynthesis is the process by which plants use sunlight to produce food.",
    gravity: "Gravity is the force that pulls objects toward the center of the Earth.",
    computer: "A computer is a machine that processes information and performs tasks.",
    javascript:
      "JavaScript is a high-level programming language for web interactivity.",
       gravity: "Gravity is the force that pulls objects toward the center of the Earth.",
    computer: "A computer is a machine that processes information and performs tasks.",
    computer: "A computer is a machine that processes information and performs tasks.",
    javascipt: "JavaScript is a high-level, dynamic, and interpreted programming language primarily used to create interactive and dynamic content on websites. It is a core technology of the World Wide Web, alongside HTML and CSS.",
    whatIsWeather: "Weather is the day-to-day state of the atmosphere in a particular place.",
  whatIsClimate: "Climate is the average weather conditions of a region over a long period.",
  whatIsEarth: "Earth is the third planet from the Sun and the only known planet to support life.",
  whatIsMoon: "The Moon is Earth's only natural satellite, affecting tides and visible phases.",
  whatIsSun: "The Sun is a star at the center of our solar system, providing light and heat.",
  whatIsSolarSystem: "The solar system includes the Sun and all celestial bodies that orbit it.",
  whatIsGalaxy: "A galaxy is a system of stars, planets, gas, and dust bound by gravity.",
  whatIsMilkyWay: "The Milky Way is the galaxy that contains our solar system.",
  whatIsUniverse: "The Universe is all of space, time, matter, and energy that exists.",
  whatIsBlackHole: "A black hole is a region of space with gravity so strong that nothing escapes.",
  whatIsStar: "A star is a luminous sphere of plasma held together by gravity.",
  whatIsPlanet: "A planet is a celestial body orbiting a star, large enough to be rounded by gravity.",
  whatIsVolcano: "A volcano is a mountain that erupts with lava, ash, and gases from Earth's crust.",
  whatIsEarthquake: "An earthquake is the shaking of the ground caused by tectonic movement.",
  whatIsTsunami: "A tsunami is a large ocean wave caused by underwater earthquakes or eruptions.",
  whatIsHurricane: "A hurricane is a powerful tropical storm with strong winds and rain.",
  whatIsTyphoon: "A typhoon is the same as a hurricane, but it forms in the western Pacific Ocean.",
  whatIsFlood: "A flood is the overflow of water that submerges land that is usually dry.",
  whatIsDrought: "A drought is a long period of abnormally low rainfall.",
  whatIsRain: "Rain is liquid water droplets falling from clouds.",
  whatIsSnow: "Snow is frozen water crystals falling from the sky.",
  whatIsCloud: "A cloud is a visible mass of water droplets or ice crystals in the sky.",
  whatIsRainbow: "A rainbow is a spectrum of light appearing in the sky after rain when sunlight refracts.",
  whatIsOcean: "An ocean is a large body of salt water covering most of Earth’s surface.",
  whatIsRiver: "A river is a natural flowing stream of water toward a sea, lake, or another river.",
  whatIsLake: "A lake is a body of water surrounded by land.",
  whatIsMountain: "A mountain is a large landform rising above the surrounding land.",
  whatIsDesert: "A desert is a barren area with very little rainfall and scarce life.",
  whatIsForest: "A forest is a large area covered with trees and plants.",
  whatIsIsland: "An island is a piece of land surrounded by water.",
  whatIsContinent: "A continent is a large continuous landmass, such as Asia, Africa, or Europe.",
  whatIsAsia: "Asia is the largest continent on Earth, both in size and population.",
  whatIsEurope: "Europe is a continent known for its history, culture, and economic influence.",
  whatIsAfrica: "Africa is the second-largest continent, rich in culture and natural resources.",
  whatIsNorthAmerica: "North America includes the U.S., Canada, Mexico, and other countries.",
  whatIsSouthAmerica: "South America is known for the Amazon rainforest and Andes mountains.",
  whatIsAustralia: "Australia is both a country and a continent, located in the Southern Hemisphere.",
  whatIsAntarctica: "Antarctica is the coldest continent, covered mostly in ice.",
  whatIsPhilippines: "The Philippines is an archipelago of more than 7,000 islands in Southeast Asia.",
  whatIsUSA: "The United States of America is a federal republic of 50 states.",
  whatIsJapan: "Japan is an island nation in East Asia known for its technology and culture.",
  whatIsChina: "China is the most populous country in the world, located in East Asia.",
  whatIsIndia: "India is a South Asian country known for its diversity and large population.",
  whatIsBrazil: "Brazil is the largest country in South America, famous for the Amazon rainforest.",
  whatIsCanada: "Canada is the second-largest country in the world, known for its natural landscapes.",
  whatIsRussia: "Russia is the largest country in the world, spanning Europe and Asia.",
  whatIsUK: "The United Kingdom is a country made up of England, Scotland, Wales, and Northern Ireland.",
  whatIsFrance: "France is a European country famous for its culture, cuisine, and history.",
  whatIsGermany: "Germany is a European country known for engineering and history.",
  whatIsItaly: "Italy is famous for its ancient Roman history, culture, and cuisine.",
  whatIsSpain: "Spain is a European country known for art, music, and festivals.",
  whatIsKorea: "South Korea is known for its technology, K-pop, and economic growth.",
  whatIsMusic: "Music is the art of arranging sounds to create harmony, rhythm, and expression.",
  whatIsDance: "Dance is the art of body movement, often to music.",
  whatIsArt: "Art is the expression of creativity through forms like painting, sculpture, and music.",
  whatIsPainting: "A painting is a work of art made with colors on a surface.",
  whatIsStatue: "A statue is a carved or cast figure representing a person or thing.",
  whatIsBook: "A book is a collection of written or printed pages bound together.",
  whatIsNovel: "A novel is a long fictional story written in prose.",
  whatIsPoem: "A poem is a piece of writing that expresses feelings using rhythm and metaphor.",
  whatIsStory: "A story is a narrative about people, events, or imaginary situations.",
  whatIsFilm: "A film or movie is a story presented through moving images.",
  whatIsDrama: "Drama is a type of play or performance with emotional themes.",
  whatIsComedy: "Comedy is entertainment designed to make people laugh.",
  whatIsTheater: "Theater is live performance of plays or shows.",
  whatIsTelevision: "Television is an electronic system for broadcasting and watching programs.",
  whatIsRadio: "Radio is a technology for transmitting sound through electromagnetic waves.",
  whatIsCar: "A car is a road vehicle powered by an engine, used for transport.",
  whatIsBus: "A bus is a large road vehicle designed to carry many passengers.",
  whatIsTrain: "A train is a series of connected vehicles running on rails for transport.",
  whatIsAirplane: "An airplane is a powered flying vehicle with fixed wings.",
  whatIsShip: "A ship is a large watercraft used for transport across seas and oceans.",
  whatIsBicycle: "A bicycle is a two-wheeled vehicle powered by pedaling.",
  whatIsMotorcycle: "A motorcycle is a two-wheeled motor vehicle.",
  whatIsPhone: "A phone is a device used for communication, often mobile.",
  whatIsSmartphone: "A smartphone is a handheld device combining phone, internet, and apps.",
  whatIsComputerGeneral: "A computer is a machine that processes information and performs tasks.",
  whatIsEmail: "Email is electronic mail sent over the internet.",
  whatIsMessage: "A message is information sent from one person to another.",
  whatIsFriendship: "Friendship is a close and trusting relationship between people.",
  whatIsLove: "Love is a deep feeling of affection and care for someone.",
  whatIsFamily: "Family is a group of people related by blood, marriage, or adoption.",
  whatIsHealth: "Health is the state of physical, mental, and social well-being.",
  whatIsFood: "Food is any substance consumed to provide energy and nutrients.",
  whatIsWater: "Water is a transparent liquid essential for life.",
  whatIsAir: "Air is the mixture of gases that makes up Earth's atmosphere.",
  whatIsSleep: "Sleep is a natural state of rest for the body and mind.",
  whatIsDream: "A dream is a sequence of thoughts, images, and sensations during sleep.",
  whatIsExercise: "Exercise is physical activity that improves health and fitness.",
  whatIsSports: "Sports are physical activities or games played competitively or for fun.",
  whatIsSoccer: "Soccer, or football, is the most popular sport in the world.",
  whatIsBasketball: "Basketball is a game played by two teams of five players with a ball and hoop.",
  whatIsVolleyball: "Volleyball is a sport where two teams hit a ball over a net.",
  whatIsTennis: "Tennis is a racket sport played on a rectangular court.",
  whatIsOlympics: "The Olympics are international sports competitions held every four years.",
  whatIsHistoryGeneral: "History is the study of past events and human civilization.",
  whatIsWar: "A war is a conflict between nations or groups using military force.",
  whatIsPeace: "Peace is the absence of conflict and the presence of harmony.",
  photosynthesis:
    "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize food from carbon dioxide and water.",
  gravity:
    "Gravity is a natural phenomenon by which all things with mass are brought toward one another, especially toward Earth.",
  computer:
    "A computer is an electronic device that manipulates information or data and performs tasks like calculations, storage, and communication.",
  internet:
    "The Internet is a global network of interconnected computers that communicate using standardized protocols.",
  ai: "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.",
  algorithm:
    "An algorithm is a set of instructions designed to perform a specific task or solve a problem step by step.",
  database:
    "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.",
  operatingSystem:
    "An operating system (OS) is software that manages computer hardware and software resources and provides services for applications.",
  cloudComputing:
    "Cloud computing is the delivery of computing services like servers, storage, and databases over the internet.",
  programming:
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    whatIsHTML: "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
  whatIsCSS: "CSS (Cascading Style Sheets) is used to style and format the layout of HTML documents.",
  whatIsJavaScript: "JavaScript is a high-level programming language that enables interactivity on web pages.",
  whatIsReact: "React is a JavaScript library for building user interfaces, maintained by Meta.",
  whatIsNodeJS: "Node.js is a runtime environment that allows JavaScript to run outside the browser.",
  whatIsFirebase: "Firebase is a Google platform for mobile and web apps with tools like authentication and database.",
  whatIsGit: "Git is a version control system that tracks changes in source code during software development.",
  whatIsGitHub: "GitHub is a hosting service for Git repositories with collaboration features.",
  whatIsAPI: "An API (Application Programming Interface) allows different software applications to communicate.",
  whatIsREST: "REST (Representational State Transfer) is an architectural style for designing networked applications.",
  whatIsJSON: "JSON (JavaScript Object Notation) is a lightweight format for storing and transporting data.",
  whatIsSQL: "SQL (Structured Query Language) is used to manage and query relational databases.",
  whatIsNoSQL: "NoSQL databases are non-relational and handle unstructured or semi-structured data.",
  whatIsMySQL: "MySQL is an open-source relational database management system.",
  whatIsMongoDB: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
  whatIsCybersecurity: "Cybersecurity refers to protecting systems, networks, and programs from digital attacks.",
  whatIsFirewall: "A firewall is a network security device that monitors and controls incoming and outgoing traffic.",
  whatIsEncryption: "Encryption is the process of encoding data so only authorized parties can access it.",
  whatIsDecryption: "Decryption is converting encrypted data back into its original form.",
  whatIsPhishing: "Phishing is a type of cyber attack where attackers trick users into revealing sensitive info.",
  whatIsMalware: "Malware is software designed to damage, disrupt, or gain unauthorized access to systems.",
  whatIsTrojan: "A Trojan horse is malicious software disguised as legitimate to trick users.",
  whatIsVirus: "A computer virus is a program that spreads by infecting files and systems.",
  whatIsWorm: "A worm is a type of malware that spreads across networks without user action.",
  whatIsNetwork: "A network is a group of computers connected to share resources and information.",
  whatIsLAN: "LAN (Local Area Network) connects computers within a limited area like an office or home.",
  whatIsWAN: "WAN (Wide Area Network) connects computers over a large geographic area, like the internet.",
  whatIsIP: "An IP address is a unique identifier for a device on a network.",
  whatIsIPv4: "IPv4 uses 32-bit addresses to identify devices on a network.",
  whatIsIPv6: "IPv6 uses 128-bit addresses to replace IPv4 due to address exhaustion.",
  whatIsDNS: "DNS (Domain Name System) translates domain names into IP addresses.",
  whatIsHTTP: "HTTP (Hypertext Transfer Protocol) is used for transmitting data on the web.",
  whatIsHTTPS: "HTTPS is HTTP with encryption for secure communication.",
  whatIsSSL: "SSL (Secure Sockets Layer) is a protocol for securing communication over the internet.",
  whatIsTLS: "TLS (Transport Layer Security) is the modern version of SSL for encryption.",
  whatIsRouter: "A router directs network traffic between different devices and networks.",
  whatIsSwitch: "A switch connects devices in a LAN and forwards data to the right device.",
  whatIsHub: "A hub is a basic networking device that sends data to all devices in a network.",
  whatIsVPN: "A VPN (Virtual Private Network) encrypts internet connections for privacy and security.",
  whatIsDocker: "Docker is a platform for containerizing applications to run consistently across environments.",
  whatIsKubernetes: "Kubernetes is a system for automating deployment, scaling, and management of containerized apps.",
  whatIsAgile: "Agile is a software development methodology that emphasizes flexibility and collaboration.",
  whatIsScrum: "Scrum is an Agile framework for managing complex projects.",
  whatIsDevOps: "DevOps combines software development (Dev) and IT operations (Ops) for faster delivery.",
  whatIsIDE: "An IDE (Integrated Development Environment) is software that provides tools for programming.",
  whatIsCompiler: "A compiler translates source code into machine code executable by a computer.",
  whatIsInterpreter: "An interpreter runs code directly, line by line, without compiling it first.",
  whatIsDebugging: "Debugging is the process of identifying and fixing errors in code.",
  whatIsTesting: "Testing is evaluating software to ensure it works as intended.",
  whatIsUnitTest: "Unit testing checks individual parts of the code for correctness.",
  whatIsIntegrationTest: "Integration testing ensures combined modules work together properly.",
  whatIsCloud: "Cloud computing provides on-demand access to computing resources via the internet.",
  whatIsIaaS: "IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet.",
  whatIsPaaS: "PaaS (Platform as a Service) provides a platform to build, run, and manage applications.",
  whatIsSaaS: "SaaS (Software as a Service) delivers software over the internet on a subscription basis.",
  whatIsMachineLearning: "Machine Learning is a branch of AI where systems learn from data.",
  whatIsDeepLearning: "Deep Learning uses neural networks with many layers to analyze complex data.",
  whatIsBigData: "Big Data refers to extremely large datasets that require special tools to analyze.",
  whatIsDataScience: "Data Science combines statistics, programming, and domain expertise to analyze data.",
  whatIsUI: "UI (User Interface) refers to the visual elements users interact with in software.",
  whatIsUX: "UX (User Experience) is how users feel when interacting with a system.",
  whatIsFrontend: "Frontend development deals with the user interface of web applications.",
  whatIsBackend: "Backend development focuses on server-side logic and databases.",
  whatIsFullstack: "A fullstack developer works on both frontend and backend parts of an app.",
  whatIsAPIKey: "An API key is a code used to authenticate a program or user accessing an API.",
  whatIsCI: "Continuous Integration (CI) is merging code changes frequently with automated testing.",
  whatIsCD: "Continuous Delivery/Deployment (CD) is automating software release processes.",
  whatIsCache: "A cache stores data temporarily to speed up future requests.",
  whatIsCookie: "A cookie is a small piece of data stored by websites on a user's browser.",
  whatIsSession: "A session is a temporary interaction between a user and a system.",
  whatIsHashing: "Hashing is converting data into a fixed-size value for security.",
  whatIsBlockchain: "Blockchain is a decentralized digital ledger of transactions.",
  whatIsToken: "A token is a digital asset that represents ownership or access rights.",
  whatIsAIModel: "An AI model is a program trained on data to make predictions or decisions.",
  whatIsNeuralNetwork: "A neural network is a system of algorithms inspired by the human brain.",
  whatIsPython: "Python is a popular high-level programming language known for simplicity.",
  whatIsJava: "Java is a general-purpose programming language designed for portability.",
  whatIsC: "C is a powerful low-level programming language used for system programming.",
  whatIsCPlusPlus: "C++ is an extension of C with object-oriented features.",
  whatIsCSharp: "C# is a programming language developed by Microsoft for .NET applications.",
  whatIsPHP: "PHP is a server-side scripting language for web development.",
  whatIsRuby: "Ruby is a high-level programming language known for its simplicity.",
  whatIsSwift: "Swift is a programming language developed by Apple for iOS and macOS apps.",
  whatIsKotlin: "Kotlin is a programming language designed for modern Android app development.",
  whatIsAssembly: "Assembly language is a low-level programming language close to machine code.",
  whatIsVirtualization: "Virtualization is creating virtual versions of computing resources.",
  whatIsHypervisor: "A hypervisor is software that creates and runs virtual machines.",
  whatIsSSD: "An SSD (Solid State Drive) is a storage device faster than HDDs.",
  whatIsHDD: "An HDD (Hard Disk Drive) is a traditional magnetic storage device.",
  whatIsRAM: "RAM (Random Access Memory) is volatile memory used by computers for active processes.",
  whatIsROM: "ROM (Read-Only Memory) stores permanent data that cannot be modified easily.",
  whatIsCPU: "The CPU (Central Processing Unit) is the brain of the computer that executes instructions.",
  whatIsGPU: "A GPU (Graphics Processing Unit) accelerates rendering of images and video.",
  whatIsMotherboard: "The motherboard is the main circuit board that connects all components of a computer.",
  whatIsPowerSupply: "A power supply converts electrical power to run computer components.",
  whatIsIoT: "The Internet of Things (IoT) refers to devices connected to the internet to collect and exchange data.",
  whatIs5G: "5G is the fifth generation of mobile network technology, offering faster speeds and lower latency.",
  whatIsMotherhood: "Motherhood is the experience of raising and caring for children.",
  whatIsParenting: "Parenting is the process of raising and guiding a child’s development.",
  howToCalmCryingBaby: "To calm a crying baby, try feeding, burping, rocking, or checking the diaper.",
  howToPutBabyToSleep: "Keep the room quiet, dim lights, and gently rock or sing to the baby.",
  whatIsBreastfeeding: "Breastfeeding is feeding a baby with milk directly from the mother’s breast.",
  whatIsFormulaMilk: "Formula milk is a manufactured substitute for breast milk.",
  howToWeanBaby: "Start weaning at 6 months by introducing solid food slowly with mashed fruits and veggies.",
  howManyDiapersPerDay: "A newborn uses around 8-12 diapers a day.",
  howToPreventDiaperRash: "Keep the baby clean, dry, and use diaper cream when needed.",
  whatIsColic: "Colic is frequent, prolonged crying in an otherwise healthy infant.",
  whenBabyStartsWalking: "Most babies start walking between 12 to 15 months.",
  whenBabyStartsTalking: "Babies usually say their first words around 12 months.",
  howToPottyTrain: "Introduce the potty around age 2, encourage, and reward small progress.",
  howToDisciplineToddler: "Use positive reinforcement, set clear boundaries, and be consistent.",
  whatIsTantrum: "A tantrum is an emotional outburst common in toddlers when they are frustrated.",
  howToHandleTantrum: "Stay calm, don’t give in, and comfort the child after they calm down.",
  howToTeachSharing: "Encourage turn-taking and praise when the child shares toys.",
  howToTeachKindness: "Model kindness, read stories about empathy, and encourage helpful behavior.",
  howToPrepareForSchool: "Establish routines, teach basic skills, and encourage independence.",
  whatIsBullying: "Bullying is repeated aggressive behavior intended to hurt another person.",
  howToHandleBullying: "Support the child, talk to teachers, and teach confidence and resilience.",
  howToHelpWithHomework: "Create a quiet space, encourage questions, and assist without giving answers.",
  whatIsHealthySnack: "Healthy snacks include fruits, yogurt, nuts, and whole grain crackers.",
  howMuchWaterForKids: "Children need about 5–7 glasses of water per day depending on age.",
  howToBoostImmunity: "A balanced diet, sleep, exercise, and vaccinations help boost immunity.",
  whatIsVaccination: "Vaccination protects children from harmful diseases.",
  howToTreatFever: "Use fever medicine (if needed), keep hydrated, and monitor the child.",
  whenToCallDoctor: "If a child has difficulty breathing, persistent fever, or unusual behavior.",
  whatIsAllergy: "An allergy is an overreaction of the immune system to a substance.",
  whatIsAsthma: "Asthma is a condition that causes breathing difficulty due to airway inflammation.",
  howToPreventCavities: "Encourage brushing twice a day, flossing, and avoiding too much sugar.",
  whenToSeeDentist: "Children should see a dentist by their first birthday or first tooth.",
  whatIsPuberty: "Puberty is the stage when children’s bodies begin to mature into adults.",
  howToTalkAboutPuberty: "Be open, honest, and age-appropriate about body changes.",
  whatIsTeenRebellion: "Teen rebellion is resistance to rules as teens seek independence.",
  howToHandleTeenRebellion: "Set clear rules, communicate calmly, and show respect.",
  whatIsChoreChart: "A chore chart helps assign and track household responsibilities.",
  howToTeachResponsibility: "Give age-appropriate tasks and reward responsibility.",
  howToBudgetFamily: "Track income, limit unnecessary expenses, and save for emergencies.",
  whatIsEmergencyFund: "An emergency fund is money set aside for unexpected expenses.",
  howToSaveOnGroceries: "Make a shopping list, buy in bulk, and choose generic brands.",
  howToPlanMeals: "Plan weekly menus, include balanced nutrition, and reduce food waste.",
  whatIsHealthyMeal: "A healthy meal includes vegetables, protein, whole grains, and fruits.",
  howToEncourageVegetables: "Make veggies fun, mix with favorite foods, and set an example.",
  whatIsObesity: "Obesity is excess body fat that may affect health.",
  howToPreventObesity: "Encourage healthy eating, active play, and limit screen time.",
  howMuchScreenTime: "Kids should have less than 2 hours of recreational screen time daily.",
  whatIsFamilyBonding: "Family bonding is spending quality time to strengthen relationships.",
  howToDoFamilyBonding: "Eat meals together, play games, and have regular family talks.",
  whatIsQualityTime: "Quality time means focused, meaningful moments spent with loved ones.",
  howToRaiseRespectfulKids: "Model respect, set expectations, and praise polite behavior.",
  howToEncourageReading: "Read aloud, provide books, and make reading fun daily.",
  whatIsStorytelling: "Storytelling is sharing tales to teach lessons and entertain.",
  howToTeachManners: "Teach polite words, model good behavior, and reinforce with practice.",
  whatIsFamilyTradition: "Family traditions are customs or practices passed down through generations.",
  howToCelebrateBirthday: "Plan age-appropriate activities, cake, and involve family and friends.",
  whatIsChristmas: "Christmas is a holiday celebrated on Dec 25 marking the birth of Jesus Christ.",
  howToCelebrateChristmas: "Decorate a tree, exchange gifts, and spend time with family.",
  whatIsEaster: "Easter is a Christian holiday celebrating the resurrection of Jesus.",
  whatIsThanksgiving: "Thanksgiving is a holiday for giving thanks, celebrated with a feast.",
  howToPlanVacation: "Set a budget, choose a destination, and book travel early.",
  whatIsStaycation: "A staycation is enjoying vacation activities at home or nearby.",
  howToTravelWithKids: "Pack essentials, bring snacks, and plan kid-friendly activities.",
  howToKeepKidsSafe: "Teach safety rules, supervise, and child-proof the home.",
  whatIsStrangerDanger: "Stranger danger is teaching kids not to trust unknown people.",
  howToTeachOnlineSafety: "Set rules, monitor use, and explain risks of the internet.",
  whatIsCyberbullying: "Cyberbullying is online harassment through messages or social media.",
  howToPreventCyberbullying: "Encourage open talk, monitor accounts, and report abuse.",
  howToBalanceWorkAndFamily: "Set priorities, schedule family time, and delegate tasks.",
  whatIsStress: "Stress is the body’s reaction to pressure or challenges.",
  howToReduceStress: "Exercise, deep breathing, rest, and relaxation activities help reduce stress.",
  whatIsPostpartum: "Postpartum is the period after childbirth when the mother recovers.",
  whatIsPostpartumDepression: "It is depression after giving birth, requiring support and care.",
  howToSupportMother: "Help with chores, emotional support, and ensure rest and nutrition.",
  whatIsSelfCare: "Self-care is taking time for personal health, relaxation, and well-being.",
  howToTeachPatience: "Model patience, reward waiting, and practice turn-taking.",
  howToTeachGratitude: "Encourage thank-you habits and talk about appreciating small things.",
  howToEncourageConfidence: "Praise efforts, set achievable goals, and support interests.",
  howToEncourageCreativity: "Provide art supplies, music, and space to explore ideas.",
  whatIsCuriosity: "Curiosity is the desire to learn and discover new things.",
  howToHandleSiblingRivalry: "Encourage fairness, avoid comparisons, and spend one-on-one time.",
  howToTeachFinancialLiteracy: "Teach saving, allowances, and simple budgeting.",
  howToPrepareForCollege: "Encourage studying, apply for scholarships, and plan finances.",
  howToRaisePoliteKids: "Teach respect for elders, greetings, and table manners.",
  howToTeachCooking: "Start with simple recipes, supervise, and explain kitchen safety.",
  howToEncourageSports: "Support their interests, attend games, and provide equipment.",
  howToBalanceStudyAndPlay: "Set schedules that allow both learning and relaxation.",
  howToHandlePeerPressure: "Teach values, role-play scenarios, and encourage confidence.",
  howToExplainDivorce: "Explain gently, reassure love, and keep routines stable.",
  whatIsAdoption: "Adoption is legally taking responsibility for raising another’s child.",
  howToAdoptChild: "Adoption involves legal steps through agencies or government.",
  whatIsFosterCare: "Foster care provides temporary homes for children in need.",
  whatIsWorkFromHome: "Work from home means doing your job remotely using technology.",
  howToBeProductiveAtHome: "Set routines, minimize distractions, and schedule breaks.",
  howToTeachChores: "Assign simple chores by age and reward responsibility.",
  howToEncourageTeamwork: "Promote group activities, model teamwork, and celebrate success.",
  howToPreventAccidentsAtHome: "Keep floors dry, store sharp objects safely, and use gates.",
  whatIsFirstAid: "First aid is immediate care given in case of injury or illness.",
  howToTreatCuts: "Clean with water, apply antiseptic, and cover with a bandage.",
  howToTreatBurns: "Cool burn with water, cover loosely, and seek help if severe.",
  whatIsCPR: "CPR is cardiopulmonary resuscitation, used to restore breathing and circulation.",
  whatIsChoking: "Choking is when something blocks the airway.",
  howToHelpChokingChild: "Perform back blows and abdominal thrusts if trained.",
  whatIsFamilyDoctor: "A family doctor provides general medical care for all ages.",
  whatIsPediatrician: "A pediatrician is a doctor who specializes in children’s health.",
  whenToVisitPediatrician: "For regular checkups, fevers, or unusual behavior.",
  whatIsImmunization: "Immunization is protecting against diseases through vaccines.",
  whatIsSchoolReadiness: "School readiness is when a child is prepared emotionally and academically.",
  howToTeachABC: "Use songs, flashcards, and practice daily in a fun way.",
  howToTeachNumbers: "Count objects, play number games, and practice writing.",
  howToTeachColors: "Use crayons, toys, and daily activities to name colors.",
  howToTeachShapes: "Identify shapes in toys, books, and household items.",
  howToTeachTime: "Use clocks, daily routines, and simple games.",
  howToTeachDaysOfWeek: "Sing songs, mark calendars, and repeat daily.",
  howToTeachMonths: "Use calendars and songs to memorize months.",
  howToTeachGoodHabits: "Model handwashing, brushing teeth, and politeness.",
  howToPreventCoughCold: "Ensure handwashing, proper rest, and good nutrition.",
  howToTreatCold: "Give fluids, rest, and consult a doctor if severe.",
  whatIsFlu: "The flu is a viral illness with fever, cough, and body aches.",
  howToPreventFlu: "Get vaccinated, wash hands, and avoid sick people.",
  howToMakeBedtimeRoutine: "Set a schedule, read stories, and keep consistent.",
  howToTeachPrayers: "Pray together daily and explain in simple words.",
  howToTeachRespectForNature: "Encourage recycling, gardening, and caring for animals.",
  whatIsRecycling: "Recycling is reusing materials like paper, glass, and plastic.",
  howToTeachConservation: "Turn off lights, save water, and avoid waste.",
  howToRaiseHelpfulKids: "Encourage chores, volunteer work, and praise kindness.",
  whatIsLoveLanguage: "Love languages are ways people express and receive love.",
  howToKnowChildsLoveLanguage: "Observe whether they like hugs, words, gifts, or help.",
  whatIsChildhood: "Childhood is the stage of life from birth to adolescence.",
  howToEnjoyMotherhood: "Cherish moments, take breaks, and celebrate milestones.",
  whatIsProgramming: "Programming is writing instructions for a computer to perform tasks.",
  whatIsDebugging: "Debugging is finding and fixing errors in a program.",
  whatIsCompiler: "A compiler translates source code into machine code.",
  whatIsInterpreter: "An interpreter executes code line by line without pre-compilation.",
  whatIsIDE: "An IDE (Integrated Development Environment) is software that provides coding tools like editor, debugger, and compiler.",
  whatIsAlgorithm: "An algorithm is a step-by-step solution to a problem.",
  whatIsDataStructure: "A data structure organizes data for efficient access and modification.",
  whatIsOOP: "OOP (Object-Oriented Programming) organizes code into objects containing data and behavior.",
  whatIsAPI: "An API (Application Programming Interface) allows software systems to communicate.",
  whatIsOpenSource: "Open-source software is publicly available for use, modification, and distribution.",
  pythonHelloWorld: "In Python: print('Hello, World!')",
  pythonVariables: "Variables in Python are created when you assign a value, e.g., x = 10.",
  pythonList: "A list in Python is an ordered collection, e.g., mylist = [1,2,3].",
  pythonTuple: "Tuples are immutable sequences in Python, e.g., t = (1,2,3).",
  pythonDictionary: "A dictionary is a key-value pair structure, e.g., d = {'a':1,'b':2}.",
  pythonLoop: "For loop in Python: for i in range(5): print(i).",
  pythonFunction: "Functions in Python are defined with def, e.g., def add(x,y): return x+y.",
  pythonClass: "Classes in Python define objects, e.g., class Car: pass.",
  pythonInheritance: "Inheritance allows one class to derive from another.",
  pythonLambda: "Lambda functions are anonymous, e.g., square = lambda x: x*x.",
  whatIsProgramming: "Programming is writing instructions for a computer to perform tasks.",
  whatIsDebugging: "Debugging is finding and fixing errors in a program.",
  whatIsCompiler: "A compiler translates source code into machine code.",
  whatIsInterpreter: "An interpreter executes code line by line without pre-compilation.",
  whatIsIDE: "An IDE (Integrated Development Environment) is software that provides coding tools like editor, debugger, and compiler.",
  whatIsAlgorithm: "An algorithm is a step-by-step solution to a problem.",
  whatIsDataStructure: "A data structure organizes data for efficient access and modification.",
  whatIsOOP: "OOP (Object-Oriented Programming) organizes code into objects containing data and behavior.",
  whatIsAPI: "An API (Application Programming Interface) allows software systems to communicate.",
  whatIsOpenSource: "Open-source software is publicly available for use, modification, and distribution.",
  jsHelloWorld: "In JavaScript: console.log('Hello, World!');",
  jsVarLetConst: "Use var, let, or const to declare variables.",
  jsArray: "An array holds multiple values, e.g., let arr = [1,2,3];",
  jsObject: "Objects store key-value pairs, e.g., let person = {name:'Ana', age:20};",
  jsFunction: "Functions are reusable blocks, e.g., function greet(){ return 'hi'; }",
  jsArrowFunction: "Arrow functions: const add = (a,b) => a+b;",
  jsPromise: "Promises handle async code, e.g., fetch(url).then(res => res.json());",
  jsAsyncAwait: "Async/await makes async code look synchronous.",
  jsDOM: "The DOM is the structure of a web page, manipulated with JS.",
  jsEventListener: "Add events with element.addEventListener('click', fn);",
  javaHelloWorld: "In Java: System.out.println('Hello, World!');",
  javaVariables: "Declare variables with type, e.g., int x = 10;",
  javaArray: "Arrays in Java: int[] arr = {1,2,3};",
  javaClass: "Classes define objects, e.g., class Car { String brand; }",
  javaObject: "Objects are instances of classes, e.g., Car c = new Car();",
  javaMethod: "Methods define behavior, e.g., void run(){ System.out.println('Running'); }",
  javaConstructor: "Constructors initialize objects in Java.",
  javaInheritance: "Inheritance is done using 'extends'.",
  javaInterface: "An interface defines methods a class must implement.",
  javaPolymorphism: "Polymorphism allows methods to behave differently based on context.",
  cHelloWorld: "In C: printf('Hello, World!');",
  cVariables: "Variables in C must be declared with type, e.g., int x = 5;",
  cArray: "An array in C: int arr[3] = {1,2,3};",
  cFunction: "Functions in C: int add(int a,int b){ return a+b; }",
  cPointer: "Pointers store memory addresses, e.g., int *p;",
  cStruct: "Structs group variables, e.g., struct Person { char name[20]; int age; };",
  cLoop: "For loop in C: for(int i=0;i<5;i++){ printf('%d',i); }",
  cWhile: "While loop in C: while(i<5){ i++; }",
  cIfElse: "Decision-making: if(x>0){ } else { }",
  cSwitch: "Switch statement handles multiple cases.",
   cppHelloWorld: "In C++: cout << 'Hello, World!';",
  cppClass: "Classes define objects, similar to Java.",
  cppInheritance: "C++ supports multiple inheritance.",
  cppTemplates: "Templates allow generic programming.",
  cppSTL: "STL provides data structures like vector, map, set.",
  cppPolymorphism: "Polymorphism in C++ achieved via virtual functions.",
  cppConstructor: "Constructors initialize objects automatically.",
  cppDestructor: "Destructors clean up when objects are destroyed.",
  cppFriend: "Friend functions can access private members of a class.",
  cppNamespace: "Namespaces prevent name conflicts.",
  htmlHelloWorld: "<h1>Hello, World!</h1>",
  htmlTags: "HTML uses tags like <p>, <div>, <h1>.",
  htmlAttributes: "Attributes add info, e.g., <img src='img.png' alt='image'>.",
  htmlLink: "<a href='page.html'>Click</a> creates links.",
  htmlImage: "<img src='photo.jpg' alt='Photo' /> displays an image.",
  htmlForm: "Forms collect input, e.g., <form><input></form>.",
  htmlTable: "Tables: <table><tr><td>Data</td></tr></table>.",
  htmlList: "Lists: ordered <ol> or unordered <ul>.",
  htmlSemantic: "Semantic tags describe content, e.g., <header>, <footer>.",
  htmlAudio: "<audio controls src='song.mp3'></audio> plays audio.",
  cssHelloWorld: "In CSS: h1 { color: red; }",
  cssSelectors: "Selectors target elements, e.g., .class, #id.",
  cssBoxModel: "The box model includes margin, border, padding, and content.",
  cssFlexbox: "Flexbox helps align items in rows/columns.",
  cssGrid: "CSS Grid provides 2D layout control.",
  cssColors: "Colors can be set using names, HEX, RGB, HSL.",
  cssAnimation: "CSS animations use @keyframes.",
  cssMediaQueries: "Media queries allow responsive design.",
  cssPosition: "Positions include static, relative, absolute, fixed, sticky.",
  cssZIndex: "z-index controls element stacking.",
  sqlSelect: "SELECT * FROM table fetches all rows.",
  sqlInsert: "INSERT INTO table (col1,col2) VALUES (val1,val2).",
  sqlUpdate: "UPDATE table SET col='value' WHERE id=1.",
  sqlDelete: "DELETE FROM table WHERE id=1.",
  sqlJoin: "JOIN combines rows from multiple tables.",
  sqlPrimaryKey: "A primary key uniquely identifies each row.",
  sqlForeignKey: "A foreign key links two tables.",
  sqlIndex: "Indexes speed up queries.",
  sqlTransaction: "Transactions group multiple queries safely.",
  sqlView: "Views are saved queries acting as virtual tables.",
  phpHelloWorld: "<?php echo 'Hello, World!'; ?>",
  phpVariable: "Variables start with $, e.g., $name = 'Ana';",
  phpArray: "Arrays hold multiple values, e.g., $arr = [1,2,3];",
  phpFunction: "Functions are defined with function keyword.",
  phpInclude: "Include inserts code from another file.",
  phpFormHandling: "Forms can be handled with $_POST and $_GET.",
  phpSession: "Sessions store user data across pages.",
  phpCookie: "Cookies are small files stored on the client.",
  phpMySQL: "PHP connects to MySQL using mysqli or PDO.",
  phpOOP: "PHP supports classes and objects for OOP.",
  findEvacuationCenter: "Where is the nearest evacuation center?",
prepareGoBag: "How do I prepare an emergency go-bag?",
storeWater: "How much water should I store for each person?",
storeFood: "What kind of food should I store during a disaster?",
firstAidKit: "What items should I include in a first aid kit?",
familyPlan: "How do I make an emergency plan with my family?",
contactList: "Why should I prepare an emergency contact list?",
flashlight: "Why is a flashlight important in disasters?",
radio: "What kind of radio should I use during calamities?",
phoneCharge: "How can I keep my phone charged during power outages?",
stayCalm: "Why is staying calm important during a disaster?",
earthquakeDropCoverHold: "What should I do during an earthquake?",
fireExtinguisher: "How do I use a fire extinguisher?",
evacuateSafely: "How do I evacuate safely during floods?",
boilWater: "Why should I boil water after floods?",
storeMedicine: "How much medicine should I store for emergencies?",
petsSafety: "How do I keep my pets safe during disasters?",
documentsSafe: "How do I protect important documents in disasters?",
safeZone: "How do I identify safe zones in my area?",
stayInformed: "How do I stay updated during a disaster?",
emergencyNumbers: "What emergency numbers should I memorize?",
emergencyApps: "Are there mobile apps for disaster preparedness?",
backupPower: "What backup power options can I use?",
candlesSafety: "Why should I be careful using candles?",
gasLeak: "How do I check for gas leaks after an earthquake?",
turnOffElectricity: "When should I turn off electricity during a disaster?",
evacuationDrill: "How do I conduct an evacuation drill at home?",
schoolSafety: "What should children know about school safety during disasters?",
communityPlan: "Why is a community disaster plan important?",
neighborhoodWatch: "How can neighbors help each other in emergencies?",
disasterKit: "What should be inside a disaster preparedness kit?",
backupDocuments: "Should I keep digital copies of important documents?",
maskSafety: "Why is a face mask useful during disasters?",
emergencyCash: "Why should I keep cash during emergencies?",
transportationPlan: "What if transportation shuts down during calamities?",
childSafety: "How do I protect children during disasters?",
elderlySafety: "What special care should I give to elderly during disasters?",
disabilityPlan: "How do I help persons with disabilities during calamities?",
hygieneKit: "Why is a hygiene kit important in disaster survival?",
diseasePrevention: "How do I prevent disease outbreaks during calamities?",
firePlan: "What should my family do in case of fire?",
typhoonPrep: "What do I do before a typhoon hits?",
floodPrep: "How do I prepare for flooding?",
landslideSigns: "What are the signs of an incoming landslide?",
volcanoPrep: "How do I prepare for volcanic eruptions?",
tsunamiWarning: "What do I do when there is a tsunami warning?",
stormSurge: "What is a storm surge and why is it dangerous?",
lightningSafety: "What should I do during thunderstorms and lightning?",
droughtPrep: "How do I prepare for drought?",
heatwavePrep: "How do I stay safe during a heatwave?",
coldSafety: "What to do in freezing weather emergencies?",
wildfirePrep: "How do I prepare for wildfires?",
cyclonePrep: "What is cyclone safety preparation?",
sandstormPrep: "How do I prepare for sandstorms?",
tornadoPrep: "What should I do during a tornado?",
emergencyCommunication: "What communication tools should I have?",
emergencyWhistle: "Why carry a whistle during disasters?",
backupContacts: "How do I save backup contacts?",
evacuationBag: "What is a grab-and-go evacuation bag?",
emergencyWaterPurification: "How do I purify water in emergencies?",
emergencyFoodList: "What are the best foods for long storage?",
safeCooking: "How do I cook safely during disasters?",
fireBlanket: "What is a fire blanket used for?",
earthquakeKit: "What items go in an earthquake emergency kit?",
tsunamiEvacuation: "How do I evacuate during a tsunami?",
searchAndRescue: "What is search and rescue in disasters?",
disasterPsychology: "Why is mental health important after disasters?",
traumaSupport: "How do I provide trauma support during calamities?",
communityVolunteers: "Why are volunteers important in disaster response?",
mathFractions: "How do you add and subtract fractions?",
mathDecimals: "What is the difference between fractions and decimals?",
mathPercent: "How do you convert a fraction into a percent?",
mathEquations: "What is a linear equation?",
mathGeometry: "How do you find the area of a triangle?",
mathPerimeter: "How do you calculate the perimeter of a rectangle?",
mathAngles: "What are complementary and supplementary angles?",
mathCircle: "How do you find the circumference of a circle?",
mathVolume: "What is the formula for the volume of a cube?",
mathProbability: "What does probability mean in math?",
sciencePhotosynthesis: "What is photosynthesis?",
scienceRespiration: "What is the difference between breathing and respiration?",
scienceMatter: "What are the states of matter?",
scienceAtom: "What are the parts of an atom?",
scienceEcosystem: "What is an ecosystem?",
scienceFoodChain: "What is a food chain?",
scienceWaterCycle: "What is the water cycle?",
scienceEnergy: "What are the forms of energy?",
scienceForce: "What is Newton’s first law of motion?",
scienceGravity: "What is gravity?",
englishNoun: "What is a noun?",
englishPronoun: "What are pronouns?",
englishAdjective: "What is an adjective?",
englishVerb: "What is the difference between action and linking verbs?",
englishAdverb: "What are examples of adverbs?",
englishSentence: "What are the four kinds of sentences?",
englishParagraph: "How do you write a paragraph?",
englishEssay: "What are the parts of an essay?",
englishLiterature: "What is a short story?",
englishPoetry: "What is a haiku?",
filipinoPandiwa: "Ano ang pandiwa?",
filipinoPangngalan: "Ano ang pangngalan?",
filipinoPanghalip: "Ano ang panghalip?",
filipinoPangungusap: "Ano ang simuno at panaguri?",
filipinoTula: "Ano ang tula?",
filipinoBugtong: "Ano ang bugtong?",
filipinoAlamat: "Ano ang alamat?",
filipinoEpiko: "Ano ang epiko?",
filipinoTalambuhay: "Ano ang talambuhay?",
filipinoKwentongBayan: "Ano ang kwentong bayan?",
historyPhilippines: "Who is Dr. Jose Rizal?",
historyRevolution: "What is the Philippine Revolution of 1896?",
historyAmericanPeriod: "When was the American colonization of the Philippines?",
historyJapanesePeriod: "What happened during the Japanese occupation?",
historyMartialLaw: "When was Martial Law declared in the Philippines?",
historyWorldWar: "What started World War II?",
historyUnitedNations: "What is the United Nations?",
historyASEAN: "What is ASEAN?",
historyConstitution: "What is the Philippine Constitution?",
historyHeroes: "Who are the Philippine national heroes?",
algebraEquation: "An algebraic equation is a mathematical statement that shows the equality of two expressions.",
geometryTriangle: "A triangle is a polygon with three sides and three angles.",
geometryCircle: "A circle is a set of points in a plane that are the same distance from a center point.",
geometryPythagorean: "The Pythagorean theorem states that a² + b² = c² in a right triangle.",
statisticsMean: "The mean is the average value of a set of numbers.",
statisticsMedian: "The median is the middle value in an ordered set of data.",
statisticsMode: "The mode is the number that appears most often in a dataset.",
earthScienceLayers: "The Earth has four main layers: crust, mantle, outer core, and inner core.",
earthScienceVolcano: "A volcano is an opening in the Earth's crust where lava, ash, and gases escape.",
earthScienceEarthquake: "An earthquake is the shaking of the ground caused by movement of tectonic plates.",
biologyCell: "A cell is the basic structural and functional unit of life.",
biologyMitosis: "Mitosis is the process of cell division that results in two identical daughter cells.",
biologyPhotosynthesis: "Photosynthesis uses sunlight, carbon dioxide, and water to make glucose and oxygen.",
biologyDNA: "DNA is the molecule that carries genetic instructions in living organisms.",
chemistryAtom: "An atom is the smallest unit of matter that retains the properties of an element.",
chemistryMolecule: "A molecule is two or more atoms bonded together.",
chemistryPeriodicTable: "The periodic table organizes elements by their properties and atomic number.",
chemistryAcidBase: "Acids have pH below 7, bases have pH above 7.",
chemistryChemicalReaction: "A chemical reaction is a process where substances change into new ones.",
physicsForce: "Force is a push or pull acting upon an object.",
physicsNewtonFirst: "Newton's First Law states that an object at rest stays at rest unless acted on by a force.",
physicsNewtonSecond: "Newton's Second Law states that force equals mass times acceleration (F=ma).",
physicsNewtonThird: "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
physicsLight: "Light is electromagnetic radiation visible to the human eye.",
physicsSound: "Sound is a vibration that travels through a medium like air or water.",
geographyContinents: "There are seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
geographyOceans: "There are five oceans: Pacific, Atlantic, Indian, Southern, and Arctic.",
geographyPhilippines: "The Philippines is an archipelago in Southeast Asia with more than 7,000 islands.",
geographyManila: "Manila is the capital city of the Philippines.",
historyWorldWar1: "World War I lasted from 1914 to 1918 and involved many major world powers.",
historyWorldWar2: "World War II lasted from 1939 to 1945 and was the deadliest war in history.",
historyColdWar: "The Cold War was a period of tension between the US and USSR from 1947 to 1991.",
historyEDSA: "The EDSA Revolution in 1986 ended the dictatorship of Ferdinand Marcos in the Philippines.",
englishNoun: "A noun is a word that names a person, place, thing, or idea.",
englishVerb: "A verb is a word that expresses an action or a state of being.",
englishAdjective: "An adjective describes a noun or pronoun.",
englishAdverb: "An adverb describes a verb, adjective, or another adverb.",
englishPronoun: "A pronoun replaces a noun in a sentence.",
englishPreposition: "A preposition shows the relationship between a noun/pronoun and other words.",
englishConjunction: "A conjunction connects words, phrases, or clauses.",
englishInterjection: "An interjection expresses strong emotion or surprise.",
filipinoPandiwa: "Ang pandiwa ay nagsasaad ng kilos o galaw.",
filipinoPangngalan: "Ang pangngalan ay tumutukoy sa ngalan ng tao, bagay, pook, hayop, o pangyayari.",
filipinoPanghalip: "Ang panghalip ay pamalit sa pangngalan.",
filipinoPangUri: "Ang pang-uri ay naglalarawan ng pangngalan o panghalip.",
filipinoPangAbay: "Ang pang-abay ay nagbibigay turing sa pandiwa, pang-uri, o kapwa pang-abay.",
filipinoSanaysay: "Ang sanaysay ay isang anyo ng sulatin na nagpapahayag ng kaisipan o opinyon.",
filipinoTalumpati: "Ang talumpati ay isang pormal na pahayag na inihahanda at binibigkas sa harap ng madla.",
mapehMusicNotes: "The basic musical notes are do, re, mi, fa, sol, la, ti, do.",
mapehTempo: "Tempo refers to the speed of a musical piece.",
mapehDynamics: "Dynamics in music indicate loudness or softness.",
mapehArtElements: "Elements of art include line, shape, color, texture, space, and form.",
mapehPE: "Physical Education focuses on fitness, movement, and health.",
mapehHealth: "Health education promotes physical, mental, and social well-being.",
valuesRespect: "Respect means showing consideration for others’ rights and feelings.",
valuesResponsibility: "Responsibility is being accountable for one’s actions.",
valuesHonesty: "Honesty is telling the truth and being sincere.",
valuesKindness: "Kindness is being friendly, generous, and considerate.",
valuesPerseverance: "Perseverance is continuing to try despite difficulties.",
valuesTeamwork: "Teamwork means working together to achieve a common goal.",
valuesDiscipline: "Discipline is the practice of training yourself to follow rules or improve behavior.",bibleGenesis: "Genesis is the first book of the Bible, telling about creation and early history.",
bibleExodus: "Exodus is the second book of the Bible, focusing on Moses and the Israelites leaving Egypt.",
biblePsalms: "The Book of Psalms is a collection of songs and prayers in the Old Testament.",
bibleProverbs: "Proverbs contains wise sayings and teachings for living a good life.",
bibleMatthew: "The Gospel of Matthew tells the story of Jesus’ life, teachings, death, and resurrection.",
bibleMark: "The Gospel of Mark is the shortest Gospel, focusing on the actions of Jesus.",
bibleLuke: "The Gospel of Luke emphasizes Jesus’ compassion and parables.",
bibleJohn: "The Gospel of John focuses on Jesus as the Son of God and eternal life.",
bibleActs: "The Book of Acts describes the growth of the early Christian church.",
bibleRomans: "Romans is a letter by Paul explaining faith, salvation, and righteousness.",
bibleTenCommandments: "The Ten Commandments are God’s laws given to Moses on Mount Sinai.",
bibleCreation: "Creation is the act of God making the world in six days as described in Genesis.",
bibleNoah: "Noah built an ark to survive the great flood sent by God.",
bibleAbraham: "Abraham is known as the father of faith, chosen by God to start His people.",
bibleMoses: "Moses led the Israelites out of Egypt and received the Ten Commandments.",
bibleDavid: "David was the shepherd boy who became king and killed Goliath.",
bibleSolomon: "Solomon was the son of David, known for his wisdom and building the temple.",
bibleIsaiah: "Isaiah was a prophet who spoke of God’s judgment and the coming Messiah.",
bibleJeremiah: "Jeremiah was the 'weeping prophet' who warned Israel of exile.",
bibleDaniel: "Daniel was a prophet who interpreted dreams and survived the lion’s den.",
bibleJonah: "Jonah was swallowed by a big fish when he disobeyed God’s command to preach.",
bibleMary: "Mary was the mother of Jesus, chosen by God to give birth to the Savior.",
bibleJoseph: "Joseph, son of Jacob, was sold by his brothers but rose to power in Egypt.",
biblePaul: "Paul was a missionary who wrote many New Testament letters.",
biblePeter: "Peter was one of Jesus’ disciples and a leader of the early church.",
bibleJohnTheBaptist: "John the Baptist preached repentance and baptized Jesus.",
bibleResurrection: "The resurrection is when Jesus rose from the dead after three days.",
bibleCrucifixion: "The crucifixion refers to Jesus dying on the cross to save humanity from sin.",
bibleHolySpirit: "The Holy Spirit is the third person of the Trinity, guiding believers.",
bibleTrinity: "The Trinity is one God in three persons: Father, Son, and Holy Spirit.",
bibleFaith: "Faith is trusting and believing in God even without seeing.",
biblePrayer: "Prayer is talking to and listening to God.",
bibleLove: "Love is the greatest commandment, to love God and others.",
bibleForgiveness: "Forgiveness is letting go of anger and pardoning others, as God forgives.",
bibleSin: "Sin is disobedience to God’s commands.",
bibleSalvation: "Salvation is being saved from sin through Jesus Christ.",
bibleGrace: "Grace is God’s undeserved favor toward us.",
bibleHope: "Hope is trusting God’s promises for the future.",
bibleCharity: "Charity means love in action, helping others in need.",
bibleFaithHopeLove: "Faith, hope, and love are the three greatest virtues, with love being the greatest.",
bibleArmorOfGod: "The Armor of God is spiritual protection described in Ephesians 6.",
bibleLordPrayer: "The Lord’s Prayer is the prayer Jesus taught His disciples.",
bibleBeatitudes: "The Beatitudes are blessings Jesus taught in the Sermon on the Mount.",
bibleGoodSamaritan: "The Good Samaritan is a parable teaching love for neighbors.",
bibleProdigalSon: "The Prodigal Son is a parable about forgiveness and returning to God.",
bibleLastSupper: "The Last Supper was Jesus’ final meal with His disciples before crucifixion.",
biblePentecost: "Pentecost is when the Holy Spirit came upon the disciples.",
bibleGreatCommission: "The Great Commission is Jesus’ command to spread the Gospel.",
bibleRevelation: "Revelation is the last book of the Bible, describing the end times and new heaven.",
bibleHeaven: "Heaven is the eternal home for believers with God.",
bibleHell: "Hell is the place of eternal separation from God.",
bibleAngels: "Angels are spiritual beings who serve God and deliver His messages.",
bibleDevil: "The devil, or Satan, is the enemy of God and humans.",
bibleMiracle: "A miracle is an extraordinary act of God showing His power.",
bibleBaptism: "Baptism is the act of being immersed in water as a sign of faith and repentance.",
bibleCommunion: "Communion is the remembrance of Jesus’ sacrifice through bread and wine.",
bibleChurch: "The church is the community of believers who follow Jesus.",
bibleDisciples: "The disciples were the twelve chosen followers of Jesus.",
bibleApostles: "The apostles were Jesus’ messengers spreading the Gospel.",
bibleCommandments: "The commandments are God’s laws given to guide His people.",
bibleProphets: "Prophets were chosen by God to deliver His messages to people.",
bibleParables: "Parables are short stories Jesus used to teach spiritual lessons.",
programmingWhatIsProgramming: "Programming is the process of giving instructions to a computer to perform tasks.",
programmingVariable: "A variable stores data that can change during program execution.",
programmingConstant: "A constant stores data that does not change during program execution.",
programmingDataTypes: "Common data types are integer, float, string, and boolean.",
programmingString: "A string is text inside quotes, e.g., 'Hello'.",
programmingInteger: "An integer is a whole number like 10 or -3.",
programmingFloat: "A float is a decimal number like 3.14 or -2.5.",
programmingBoolean: "A boolean has two values: true or false.",
programmingArray: "An array is a collection of values stored in one variable.",
programmingObject: "An object stores data as key-value pairs.",
programmingLoop: "A loop repeats code until a condition is met.",
programmingForLoop: "A for loop runs code a fixed number of times.",
programmingWhileLoop: "A while loop runs while a condition is true.",
programmingDoWhileLoop: "A do-while loop runs at least once, then repeats while a condition is true.",
programmingIfStatement: "An if statement runs code only if a condition is true.",
programmingElse: "Else runs code if the if condition is false.",
programmingElseIf: "Else if checks another condition if the first one is false.",
programmingSwitch: "A switch chooses code to run based on multiple possible values.",
programmingFunction: "A function is a reusable block of code that performs a task.",
programmingReturn: "Return sends a value back from a function.",
programmingParameter: "Parameters are inputs you pass to a function.",
programmingArgument: "Arguments are actual values sent to a function when it’s called.",
programmingRecursion: "Recursion is when a function calls itself.",
programmingScope: "Scope defines where variables can be accessed in code.",
programmingLocalVariable: "A local variable is declared inside a function and used only there.",
programmingGlobalVariable: "A global variable is declared outside functions and used anywhere.",
programmingCompiler: "A compiler translates code into machine language before running.",
programmingInterpreter: "An interpreter runs code line by line without pre-compilation.",
programmingIDE: "An IDE is software that helps write and test code, like VS Code.",
programmingDebugging: "Debugging is finding and fixing errors in code.",
programmingSyntaxError: "A syntax error happens when code doesn’t follow language rules.",
programmingRuntimeError: "A runtime error happens while the program is running.",
programmingLogicalError: "A logical error makes code run but gives wrong results.",
programmingAlgorithm: "An algorithm is a step-by-step procedure to solve a problem.",
programmingPseudoCode: "Pseudocode is writing logic in plain English before coding.",
programmingFlowchart: "A flowchart is a diagram that shows the steps of an algorithm.",
programmingOOP: "OOP means Object-Oriented Programming, using objects and classes.",
programmingClass: "A class is a blueprint for creating objects.",
programmingObjectInstance: "An object is an instance of a class.",
programmingConstructor: "A constructor initializes an object when it’s created.",
programmingInheritance: "Inheritance lets one class get properties from another.",
programmingPolymorphism: "Polymorphism allows methods to do different things based on input.",
programmingEncapsulation: "Encapsulation hides details inside a class.",
programmingAbstraction: "Abstraction shows only essential details and hides complexity.",
programmingLibrary: "A library is pre-written code you can reuse.",
programmingFramework: "A framework is a set of tools and libraries for building software.",
programmingAPI: "An API lets programs talk to each other.",
programmingSDK: "An SDK is a software development kit with tools for programming.",
programmingDatabase: "A database stores and organizes data for programs.",
programmingSQL: "SQL is a language for interacting with databases.",
programmingHTML: "HTML is the standard markup language for web pages.",
programmingCSS: "CSS styles the appearance of web pages.",
programmingJavaScript: "JavaScript adds interactivity to web pages.",
programmingPython: "Python is a popular beginner-friendly programming language.",
programmingJava: "Java is a widely used object-oriented programming language.",
programmingC: "C is a low-level, powerful programming language.",
programmingCpp: "C++ extends C with object-oriented features.",
programmingCSharp: "C# is a programming language developed by Microsoft.",
programmingPHP: "PHP is used for server-side web development.",
programmingRuby: "Ruby is a flexible programming language known for Ruby on Rails.",
programmingSwift: "Swift is Apple’s programming language for iOS apps.",
programmingKotlin: "Kotlin is a modern language used for Android development.",
programmingGo: "Go (Golang) is a fast language developed by Google.",
programmingRust: "Rust is a language focusing on safety and speed.",
programmingTypeScript: "TypeScript is JavaScript with optional static types.",
programmingJSON: "JSON is a lightweight format for data exchange.",
programmingXML: "XML is a markup language for structured data.",
programmingYAML: "YAML is a human-readable data format often used for configuration.",
programmingGit: "Git is a version control system for tracking code changes.",
programmingGitHub: "GitHub is a platform for hosting Git repositories.",
programmingBranch: "A branch is a copy of code to work on without affecting the main version.",
programmingMerge: "Merge combines changes from one branch into another.",
programmingCommit: "Commit saves a snapshot of changes in Git.",
programmingPullRequest: "A pull request proposes merging code changes into another branch.",
programmingOpenSource: "Open-source software is code available for anyone to use and modify.",
programmingClosedSource: "Closed-source software has code restricted from the public.",
programmingBug: "A bug is an error in a program.",
programmingPatch: "A patch is a fix for a bug or vulnerability.",
programmingVersionControl: "Version control tracks and manages changes to code.",
programmingFrontEnd: "Front-end is the part of a website users see and interact with.",
programmingBackEnd: "Back-end is the server-side part that processes data and logic.",
programmingFullStack: "Full-stack developers work on both front-end and back-end.",
programmingResponsiveDesign: "Responsive design makes websites adapt to different devices.",
programmingMobileDevelopment: "Mobile development creates apps for phones and tablets.",
programmingDesktopApp: "A desktop app runs on personal computers.",
programmingWebApp: "A web app runs inside a web browser.",
programmingCloud: "Cloud computing uses remote servers for storage and processing.",
programmingAI: "Artificial Intelligence is teaching computers to mimic human intelligence.",
programmingML: "Machine Learning is teaching computers to learn from data.",
programmingDataStructure: "Data structures organize data, e.g., arrays, stacks, queues.",
programmingStack: "A stack stores items with last-in, first-out order.",
programmingQueue: "A queue stores items with first-in, first-out order.",
programmingLinkedList: "A linked list stores data in nodes connected by pointers.",
programmingHashTable: "A hash table stores data using key-value pairs with fast lookup.",
ClashOfClans: "In Clash of Clans, build and upgrade your village with defenses and resource collectors. Train troops to raid enemy villages for loot. Join a clan to unlock clan wars and team-based strategies.",
MobileLegends: "Mobile Legends is a 5v5 MOBA game where you control unique heroes. Work with your teammates to destroy enemy turrets and the base. Farming gold and coordinating team fights are key to winning.",
mobileGamePUBGMobile: "PUBG Mobile is a battle royale where 100 players drop into an island. Collect weapons, gear, and vehicles to survive. Stay inside the safe zone and eliminate opponents to be the last one standing.",
mobileGameFreeFire: "Free Fire is a fast-paced survival shooter game. Each match lasts around 10 minutes with 50 players fighting to survive. Loot items, use vehicles, and be the last survivor to win.",
CallOfDutyMobile: "Call of Duty Mobile combines classic multiplayer modes and battle royale. Unlock weapons, perks, and operators as you level up. Work with your squad and use strategies to outplay enemies.",
GenshinImpact: "Genshin Impact is an open-world RPG with elemental combat. Explore the vast world of Teyvat, complete quests, and collect characters. Combine elemental skills for powerful combos during battles.",
PokemonGo: "Pokémon GO is an AR game where you explore the real world to catch Pokémon. Visit PokéStops and Gyms to collect items and battle. Participate in raids and events to earn rare Pokémon.",
TempleRun: "Temple Run is a fast-paced endless runner. Swipe to turn, jump, and slide to avoid obstacles. Collect coins to unlock power-ups and characters while escaping the demon monkeys.",
AngryBirds: "Angry Birds is a physics-based puzzle game. Launch birds with a slingshot to destroy pig structures. Use different bird abilities to solve levels efficiently.",
CandyCrush: "Candy Crush is a match-3 puzzle game. Swap candies to make matches of three or more. Complete level objectives within limited moves to progress.",
Roblox: "Roblox is a platform with millions of user-generated games. Explore, play, and create your own worlds. Customize your avatar and interact with friends in different experiences.",
Minecraft: "Minecraft mobile lets you explore, build, and survive in a blocky world. Gather resources to craft tools and shelters. Play in Creative mode for unlimited building or Survival mode for challenges.",
AmongUs: "Among Us is a multiplayer deduction game. Play as a crewmate to complete tasks or an impostor to sabotage and eliminate others. Use discussions and voting to find impostors.",
BrawlStars: "Brawl Stars is a 3v3 multiplayer shooter with different modes. Unlock characters called Brawlers with unique abilities. Work with your team to complete objectives and win trophies.",
ClashRoyale: "Clash Royale is a real-time strategy card game. Deploy troops, spells, and defenses to destroy enemy towers. Earn chests and upgrade your cards to improve your deck.",
Asphalt9: "Asphalt 9 is an arcade racing game. Choose from real-world cars and race on stunning tracks. Perform stunts, drift, and boost to win races.",
PlantsVsZombies: "Plants vs Zombies is a strategy defense game. Place plants with unique abilities to stop waves of zombies. Manage sun resources and plan carefully to survive each level.",
FruitNinja: "Fruit Ninja is a fast-paced slicing game. Swipe across the screen to slice fruits while avoiding bombs. Chain combos for higher scores and unlock new blades.",
HillClimbRacing: "Hill Climb Racing is a physics-based driving game. Drive vehicles across uneven terrains and collect coins. Upgrade your car to travel farther and improve performance.",
DragonCity: "Dragon City lets you breed, hatch, and collect dragons. Train them to battle in arenas against other players. Build habitats and expand your dragon city.",
mobileGame8BallPool: "8 Ball Pool is an online billiards game. Play against friends or random players worldwide. Improve your skills, earn coins, and join tournaments.",
mobileGameHayDay: "Hay Day is a farming simulation game. Grow crops, raise animals, and trade goods. Expand your farm and connect with friends for trading.",
mobileGameCookingFever: "Cooking Fever is a time-management cooking game. Serve dishes quickly to satisfy customers. Upgrade your kitchen and unlock new restaurants.",
mobileGameTetris: "Tetris is a classic block-stacking puzzle game. Rotate and place blocks to complete lines. Keep the screen from filling up to score higher.",
mobileGameCrossyRoad: "Crossy Road is an endless hopping game. Help characters cross roads and rivers without getting hit. Collect coins to unlock new characters.",
mobileGameZombieTsunami: "Zombie Tsunami is an endless runner with a twist. Turn humans into zombies to grow your horde. Collect power-ups and complete missions.",
mobileGameJetpackJoyride: "Jetpack Joyride is a side-scrolling endless runner. Control Barry with different jetpacks to dodge obstacles. Collect coins and complete missions for rewards.",
mobileGameWordscapes: "Wordscapes is a word puzzle game. Connect letters to form words and fill the crossword. Solve levels to unlock scenic backgrounds.",
mobileGameTriviaCrack: "Trivia Crack is a quiz game with multiple categories. Answer questions correctly to earn characters. Challenge friends and test your knowledge.",
mobileGameUNO: "UNO mobile is a card game where you match colors or numbers. Use action cards like Skip and Reverse to outplay opponents. Be the first to play all your cards to win.",
mobileGameLudoKing: "Ludo King is a classic board game played with dice. Race your tokens to the finish line before others. Play offline with friends or online with players worldwide.",
mobileGameBadland: "Badland is a side-scrolling action-adventure. Guide creatures through traps and obstacles. Use power-ups and physics to survive levels.",
mobileGameGeometryDash: "Geometry Dash is a rhythm-based platformer. Jump and fly through obstacles synced with music. Practice to memorize patterns and complete levels.",
mobileGameFlappyBird: "Flappy Bird is a simple tap-to-fly game. Tap to keep the bird airborne and avoid pipes. The game ends if you crash into obstacles.",
mobileGamePokemonMasters: "Pokémon Masters lets you team up with famous trainers. Form 3v3 teams and battle using sync moves. Collect and upgrade trainers to progress.",
mobileGameCSR2: "CSR Racing 2 is a drag racing game. Shift gears at the right time to win races. Customize and upgrade cars to improve performance.",
mobileGameMortalKombat: "Mortal Kombat Mobile is a fighting game. Collect characters and battle in 3v3 matches. Use combos and special moves to defeat opponents.",
mobileGameInjustice2: "Injustice 2 Mobile is a superhero fighting game. Collect DC heroes and villains for battles. Upgrade gear and abilities to strengthen your team.",
mobileGameShadowFight3: "Shadow Fight 3 is a martial arts RPG. Customize your fighter with weapons and armor. Fight in story mode and PvP battles.",
mobileGameRealRacing3: "Real Racing 3 is a realistic racing simulator. Race with licensed cars on real-world tracks. Compete in time trials, events, and online races.",
mobileGameModernCombat5: "Modern Combat 5 is a first-person shooter. Play through missions or join multiplayer battles. Customize weapons and skills to fit your playstyle.",
mobileGameSniper3D: "Sniper 3D is a shooting game where you play as a sniper. Complete missions by eliminating targets from a distance. Upgrade rifles and unlock new gear.",
mobileGameSlitherIO: "Slither.io is a multiplayer snake game. Control a snake to eat pellets and grow larger. Avoid colliding with others while trying to trap them.",
mobileGameAgarIO: "Agar.io is an online multiplayer game. Control a cell to eat smaller cells and grow. Avoid being eaten by bigger cells to survive.",
mobileGameIdleMiner: "Idle Miner Tycoon is a simulation game. Manage mines to collect resources automatically. Upgrade managers and mines to increase profits.",
mobileGameBitLife: "BitLife is a life simulation game. Make decisions that shape your character's life. Experience different careers, relationships, and outcomes.",
mobileGamePlagueInc: "Plague Inc is a strategy simulation game. Create and evolve a disease to infect the world. Balance infection, severity, and lethality to succeed.",
mobileGameTerraria: "Terraria is a sandbox adventure game. Explore, mine, craft, and fight bosses. Build structures and play with friends online.",
mobileGameFarmVille2: "FarmVille 2 is a farming simulation. Plant crops, raise animals, and complete orders. Connect with neighbors and decorate your farm.",
mobileGameHungryShark: "Hungry Shark is an arcade game where you control a shark. Eat fish and people to survive. Unlock bigger sharks with more abilities.",
mobileGameWarRobots: "War Robots is a multiplayer robot battle game. Control mechs with different weapons and abilities. Team up in 6v6 matches to dominate the battlefield.",
mobileGameEternium: "Eternium is a hack-and-slash RPG. Explore dungeons, fight monsters, and collect loot. Upgrade your hero with spells and equipment.",
mobileGameSummonersWar: "Summoners War is a monster-collecting RPG. Summon creatures to fight in turn-based battles. Build teams and strategies for PvP and PvE.",
mobileGameRaidShadowLegends: "Raid Shadow Legends is a turn-based RPG. Collect champions with unique abilities. Battle in campaigns, dungeons, and PvP arenas.",
mobileGameKingdomRush: "Kingdom Rush is a tower defense game. Place towers to stop enemy waves. Upgrade towers and heroes to survive harder levels.",
mobileGameBloonsTD6: "Bloons TD 6 is a tower defense game. Use monkeys with special abilities to pop balloons. Unlock upgrades and complete challenging maps.",
mobileGameMarvelStrikeForce: "Marvel Strike Force is a turn-based squad RPG. Collect Marvel heroes and villains for battles. Complete story missions and PvP modes.",
mobileGameStarWarsGalaxy: "Star Wars Galaxy of Heroes is a turn-based RPG. Collect and upgrade Star Wars characters. Battle in campaigns, raids, and arena matches.",
mobileGameDungeonHunter5: "Dungeon Hunter 5 is an action RPG. Fight demons and bosses in dungeons. Collect gear and craft powerful weapons.",
mobileGameHeroesArena: "Heroes Arena is a mobile MOBA game. Choose from many heroes and battle in 5v5 matches. Destroy turrets and defeat enemies for victory.",
mobileGameVainglory: "Vainglory is a MOBA with detailed graphics. Play 5v5 matches with unique heroes. Use strategy and teamwork to win.",
mobileGameSoulKnight: "Soul Knight is a dungeon crawler shooter. Collect weapons and defeat enemies in procedurally generated dungeons. Upgrade characters and pets for help.",
mobileGameAFK: "AFK Arena is an idle RPG game. Collect heroes that fight automatically. Progress through campaign and PvP while upgrading your squad.",
mobileGameArchero: "Archero is an action-roguelike. Play as a lone archer fighting waves of monsters. Collect skills and gear to survive longer runs.",
mobileGameIdleHeroes: "Idle Heroes is an idle RPG. Collect heroes and let them fight automatically. Progress in campaigns and PvP while upgrading your team.",
mobileGameMobileRoulette: "Mobile Roulette is a casino-style game. Bet on numbers, colors, or patterns. Spin the wheel and test your luck.",
mobileGameMobileBlackjack: "Mobile Blackjack is a card game. Try to reach 21 without going over. Play against the dealer and use strategy to win.",
mobileGameFishingClash: "Fishing Clash is a fishing simulator. Catch fish in real locations worldwide. Upgrade gear and compete in tournaments.",
mobileGameRealDrift: "Real Drift is a racing game focused on drifting. Perform drifts to earn points and money. Upgrade cars and unlock tracks.",
mobileGameNeedForSpeed: "Need for Speed Mobile is a street racing game. Customize cars and race against rivals. Complete missions and avoid police chases.",
mobileGameDrivingSchool: "Driving School Simulator teaches realistic driving. Practice driving cars, trucks, and buses. Learn road rules while completing challenges.",
mobileGameExtremeCarDriving: "Extreme Car Driving Simulator is an open-world driving game. Drive cars freely, perform stunts, and explore. Use realistic physics to practice driving.",
mobileGameStickWarLegacy: "Stick War Legacy is a strategy battle game. Control stickman armies to defeat enemies. Mine resources and upgrade troops to win.",
mobileGamePixelGun3D: "Pixel Gun 3D is a blocky first-person shooter. Play in PvP battles and survival modes. Unlock weapons and customize your character.",
mobileGameBowmasters: "Bowmasters is a physics-based shooting game. Aim and shoot arrows to hit opponents. Use different characters with unique weapons.",
mobileGameMiniMilitia: "Mini Militia is a 2D shooter with jetpacks. Play with friends or online in fast matches. Collect weapons and power-ups to dominate.",
StickmanSoccer: "Stickman Soccer is a simple football game. Control stickmen to score goals. Play quick matches or tournaments.",
WorldCricketChampionship: "World Cricket Championship is a cricket game. Play matches with realistic controls and graphics. Choose teams and compete in tournaments.",
ScoreHero: "Score Hero is a soccer game with story mode. Complete levels by scoring goals with swipes. Progress your player’s career through challenges.",
DreamLeagueSoccer: "Dream League Soccer is a football management game. Build your team, train players, and compete in matches. Upgrade stadiums and rise through leagues.",
TopEleven: "Top Eleven is a football manager simulator. Create and manage your own team. Train players, set tactics, and compete in leagues.",
GameeFootball: "eFootball (PES) is a realistic soccer game. Play matches with licensed clubs and players. Compete in events and tournaments.",
FIFA: "FIFA Mobile is a football simulation. Build your squad with real players. Play matches, events, and PvP to earn rewards.",
WWE: "WWE Champions is a puzzle-fighting game. Match gems to perform wrestling moves. Collect WWE superstars and compete in events.",
UFC: "UFC Mobile is a mixed martial arts fighting game. Choose fighters and battle in octagon matches. Upgrade moves and stats to improve fighters.",
Tekken: "Tekken Mobile is a fighting game with classic characters. Collect fighters and battle in story mode or PvP. Use combos and special moves for victories.",
StreetFighter: "Street Fighter Mobile is a fighting game adaptation. Choose fighters and battle with special attacks. Defeat enemies in arcade or versus modes.",
DragonBallLegends: "Dragon Ball Legends is an action RPG. Collect DB characters and fight in real-time battles. Use combos and special skills to win matches.",
OnePieceBountyRush: "One Piece Bounty Rush is a 4v4 battle game. Play as One Piece characters to capture treasure. Use abilities and teamwork for victory.",
rose: "The rose is a classic flower symbolizing love and beauty. It comes in many colors such as red, white, and yellow. Roses are popular in gardens and bouquets worldwide.",
tulip: "Tulips are spring-blooming flowers known for their bright cup-shaped petals. They originate from Central Asia and are famous in the Netherlands. Tulips symbolize elegance and new beginnings.",
lily: "Lilies are fragrant flowers with large, trumpet-shaped blooms. They are often used in religious and ceremonial settings. Lilies symbolize purity, renewal, and devotion.",
daisy: "Daisies are simple flowers with white petals and yellow centers. They grow easily in many climates and are loved for their cheerful look. Daisies symbolize innocence and joy.",
orchid: "Orchids are exotic flowers with unique shapes and patterns. They are known for their elegance and are often grown indoors. Orchids symbolize luxury, strength, and beauty.",
sunflower: "Sunflowers are tall flowers with bright yellow petals and large centers. They follow the sun’s direction during the day. Sunflowers symbolize positivity, energy, and happiness.",
jasmine: "Jasmine flowers are small, white, and highly fragrant. They are often used in perfumes and teas. Jasmine symbolizes purity, love, and kindness.",
lotus: "The lotus is a sacred flower in many cultures. It grows in muddy water but blooms beautifully on the surface. The lotus symbolizes purity, rebirth, and spiritual awakening.",
violet: "Violets are small flowers that come in shades of purple, blue, and white. They are often used in gardens and floral decorations. Violets symbolize modesty and faithfulness.",
marigold: "Marigolds are bright orange and yellow flowers. They are commonly used in festivals and traditional ceremonies. Marigolds symbolize warmth, creativity, and positive energy.",
peony: "Peonies are large, fluffy flowers with many petals. They are especially popular in weddings and symbolize romance. Peonies are linked to prosperity and honor.",
daffodil: "Daffodils are trumpet-shaped flowers that bloom in spring. They are usually yellow or white. Daffodils symbolize hope, new beginnings, and rebirth.",
hibiscus: "Hibiscus flowers are large and colorful, often red or pink. They grow in tropical and subtropical regions. Hibiscus symbolizes beauty, femininity, and delicate charm.",
azalea: "Azaleas are bright flowering shrubs that bloom in spring. They come in pink, red, purple, and white. Azaleas symbolize passion and abundance.",
camellia: "Camellias are elegant flowers with rounded petals. They are often found in shades of red, pink, and white. Camellias symbolize admiration and perfection.",
poppy: "Poppies are delicate flowers with thin petals. Red poppies are symbols of remembrance and sacrifice. They also represent peace and sleep in literature.",
iris: "Irises are striking flowers named after the Greek goddess of the rainbow. They grow in purple, blue, yellow, and white shades. Irises symbolize wisdom, faith, and courage.",
magnolia: "Magnolias are large and fragrant flowers. They are among the oldest flowering plants on Earth. Magnolias symbolize dignity, strength, and perseverance.",
chrysanthemum: "Chrysanthemums are widely cultivated flowers with many petal forms. They are popular in autumn gardens. Chrysanthemums symbolize friendship and long life.",
lavender: "Lavender is a fragrant purple flower. It is often used in oils, perfumes, and relaxation products. Lavender symbolizes calmness, grace, and healing.",
anemone: "Anemones are delicate flowers that sway easily in the wind. They come in many colors, including red and purple. Anemones symbolize anticipation and protection.",
gardenia: "Gardenias are creamy white flowers with a sweet fragrance. They are often used in perfumes and weddings. Gardenias symbolize purity, love, and joy.",
dahlia: "Dahlias are colorful, spiky flowers that bloom in late summer. They come in many sizes and patterns. Dahlias symbolize creativity and inner strength.",
freesia: "Freesias are fragrant flowers with funnel-shaped blooms. They are popular in bouquets and perfumes. Freesias symbolize innocence and friendship.",
zinnia: "Zinnias are bright, long-lasting flowers. They are popular in summer gardens. Zinnias symbolize endurance and lasting affection.",
geranium: "Geraniums are hardy flowers with clusters of bright blooms. They are often planted in pots and gardens. Geraniums symbolize health and protection.",
petunia: "Petunias are trumpet-shaped flowers that bloom in many colors. They are common in hanging baskets and gardens. Petunias symbolize comfort and soothing presence.",
gladiolus: "Gladiolus flowers grow in tall spikes with multiple blooms. They are often used in floral arrangements. Gladiolus symbolizes strength and integrity.",
begonia: "Begonias are colorful flowers often grown indoors or in shaded gardens. They bloom in red, pink, and orange tones. Begonias symbolize harmony and gratitude.",
carnation: "Carnations are ruffled flowers often used in bouquets. They come in many colors, each with its meaning. Carnations symbolize love and fascination.",
snowdrop: "Snowdrops are delicate white flowers that bloom in early spring. They are among the first flowers to appear after winter. Snowdrops symbolize hope and purity.",
primrose: "Primroses are early-blooming flowers in bright colors. They are often planted in gardens for spring decoration. Primroses symbolize youth and renewal.",
buttercup: "Buttercups are small yellow flowers. They are often found in fields and meadows. Buttercups symbolize cheerfulness and childish joy.",
cosmos: "Cosmos flowers are daisy-like blooms that come in bright colors. They are easy to grow in gardens. Cosmos symbolize harmony and peace.",
nasturtium: "Nasturtiums are edible flowers with a peppery taste. They are often grown for both beauty and flavor. Nasturtiums symbolize victory and strength.",
pansy: "Pansies are colorful flowers with face-like patterns. They thrive in cool seasons. Pansies symbolize thoughtfulness and remembrance.",
bluebell: "Bluebells are delicate blue flowers that grow in clusters. They carpet woodlands in spring. Bluebells symbolize humility and gratitude.",
camomile: "Camomile produces small daisy-like flowers. It is often used to make calming herbal tea. Camomile symbolizes relaxation and healing.",
foxglove: "Foxgloves are tall flowers with bell-shaped blooms. They come in purple, pink, and white. Foxgloves symbolize confidence and creativity.",
hollyhock: "Hollyhocks are tall garden flowers with multiple blooms along the stem. They come in bright shades like red, pink, and yellow. Hollyhocks symbolize ambition and growth.",
hyacinth: "Hyacinths are fragrant spring flowers with clusters of petals. They come in colors like blue, pink, and white. Hyacinths symbolize playfulness and rebirth.",
celandine: "Celandines are small yellow flowers found in early spring. They thrive in wild meadows and fields. Celandines symbolize joy and happiness.",
hellebores: "Hellebores bloom in late winter or early spring. They come in shades of green, pink, and purple. Hellebores symbolize serenity and endurance.",
delphinium: "Delphiniums are tall, spiky flowers in blue and purple hues. They brighten up summer gardens. Delphiniums symbolize dignity and positivity.",
cyclamen: "Cyclamens are small flowering plants often grown indoors. They have heart-shaped leaves and pink blooms. Cyclamens symbolize devotion and affection.",
yarrow: "Yarrow is a wildflower with clusters of tiny blooms. It is often used in herbal medicine. Yarrow symbolizes healing and protection.",
coreopsis: "Coreopsis are cheerful, daisy-like flowers. They bloom in shades of yellow, red, and pink. Coreopsis symbolizes cheerfulness and love.",
aster: "Asters are star-shaped flowers that bloom in late summer. They come in purple, pink, and white. Asters symbolize patience and elegance.",
virus: "A computer virus can slow down or damage your system. The best fix is to run a trusted antivirus scan and remove the infected files. Keeping your antivirus updated prevents future infections.",
malware: "Malware often hides in suspicious downloads or email attachments. Use anti-malware tools to detect and remove them. Avoid installing unknown software to prevent reinfection.",
spyware: "Spyware secretly monitors your activities. Run a spyware removal tool to clean your system. Regular scans and careful browsing help prevent it.",
adware: "Adware shows unwanted ads on your computer. Use adware removal tools to clean it up. Avoid clicking random pop-ups or unknown links.",
ransomware: "Ransomware locks files until payment is made. The safest fix is restoring files from backups. Always keep important files stored safely offline.",
trojan: "Trojans disguise themselves as useful software. Remove them using antivirus tools. Avoid downloading files from untrusted sources.",
worm: "Worms spread across networks quickly. Disconnect from the internet and run a virus scan. Keeping your firewall on helps prevent worms.",
lag: "Computer lag is often caused by too many background apps. Close unused programs and clear cache. Adding more RAM can also improve speed.",
crash: "System crashes can happen due to hardware or software conflicts. Restart in safe mode and check for driver updates. Keep your OS patched to avoid crashes.",
freeze: "A frozen computer often needs a forced restart. Hold the power button until it shuts off, then reboot. Regular updates help reduce freezing issues.",
slow: "Slow performance may be caused by too many startup programs. Disable unnecessary apps from booting up. Cleaning disk space can also help.",
disk: "A failing disk can cause data loss. Run disk check utilities like CHKDSK. If errors remain, replace the disk immediately.",
ram: "Faulty RAM can cause blue screens. Test it with memory diagnostic tools. Replace damaged sticks if errors are found.",
cpu: "Overheating CPU leads to shutdowns. Clean dust from fans and apply new thermal paste. Ensure proper cooling to maintain performance.",
gpu: "Graphics issues may come from outdated GPU drivers. Update or reinstall them. If problems persist, check the GPU hardware.",
keyboard: "A non-working keyboard may just need cleaning. Check the cable or Bluetooth connection. Replace it if keys remain unresponsive.",
mouse: "If the mouse stops working, try another USB port. Clean the sensor area under the mouse. Replacing batteries fixes wireless mice.",
monitor: "If the monitor shows nothing, check power and cables. Test with another monitor to confirm the issue. Replace it if the display is dead.",
sound: "Sound problems may come from drivers. Reinstall or update audio drivers. Ensure speakers or headphones are properly connected.",
wifi: "When Wi-Fi fails, restart the router and PC. Update network drivers for stability. Use a wired connection if wireless stays unstable.",
bluetooth: "If Bluetooth won’t connect, re-pair the device. Update drivers for better compatibility. Restarting Bluetooth services may also help.",
battery: "Laptop batteries degrade over time. Calibrate the battery by fully draining and recharging. Replace it if charging fails consistently.",
charger: "A faulty charger won’t power your laptop. Check cables for damage and try another outlet. Replace with an original charger if broken.",
fan: "A noisy fan may be clogged with dust. Clean it using compressed air. Replace if it still makes loud noises.",
overheat: "Overheating slows performance. Keep vents clear and use cooling pads. Reapply thermal paste if needed.",
driver: "Outdated drivers cause many issues. Update them from the manufacturer’s website. Avoid third-party driver sites.",
update: "A failed update can break features. Run system restore to revert changes. Ensure stable internet before updating again.",
bios: "BIOS problems may prevent startup. Reset BIOS to default using the motherboard jumper. Update BIOS only when necessary.",
boot: "Boot failures may be due to missing system files. Repair using recovery tools. Ensure the boot drive is properly connected.",
os: "Operating system errors may need repair. Run built-in troubleshooters or reinstall the OS. Always back up important files first.",
registry: "Registry errors cause instability. Use registry cleaners carefully. Create backups before making changes.",
cache: "Corrupt cache slows systems down. Clear temporary files and browser cache. Restart to see improvements.",
startup: "Too many startup apps delay booting. Disable unnecessary ones in Task Manager. Keep only essential apps enabled.",
shutdown: "Unexpected shutdowns may signal overheating. Clean fans and check the power supply. Run diagnostics to rule out hardware issues.",
restart: "If your computer keeps restarting, check for driver errors. Disable automatic restart on system failure. Scan for malware as a precaution.",
password: "Forgotten passwords can be reset via recovery tools. Use a password reset disk or administrator account. Avoid weak passwords for safety.",
login: "Login errors may be fixed with safe mode. Reset credentials if necessary. Ensure correct keyboard layout is used.",
account: "Corrupt accounts may not load properly. Create a new user account. Transfer data to the new profile.",
firewall: "Firewalls blocking apps can cause issues. Adjust settings to allow trusted programs. Never disable firewall fully unless testing.",
antivirus: "Antivirus slowing the system may need adjustment. Reduce real-time scanning if too aggressive. Keep it updated for protection.",
popup: "Excessive popups mean adware infection. Run an adware removal tool. Avoid shady websites to prevent it again.",
spooler: "Printer spooler errors stop printing. Restart the spooler service in settings. Reinstall printer drivers if needed.",
printer: "If the printer won’t work, check cables or Wi-Fi. Ensure correct drivers are installed. Clear print queue to fix jams.",
scan: "If a scanner won’t work, reinstall drivers. Check USB connections. Restart both computer and scanner.",
usb: "USB devices may fail due to bad ports. Try another port or restart. Replace cables if still unrecognized.",
port: "Damaged ports cause connection issues. Inspect for debris and clean. Replace hardware if physically broken.",
HowToOverclock: "Overclocking can boost performance but causes heat. Adjust BIOS settings carefully and test stability. Always use proper cooling to avoid hardware damage.",

HowToDefrag: "Fragmented drives slow down access times. Use the built-in defragmentation tool to reorganize files. This improves read/write speed on HDDs, not SSDs.",

HowToUpdateDrivers: "Outdated drivers cause compatibility issues. Download the latest from the manufacturer’s website. Restart after installation to apply changes.",

HowToReinstallOS: "If your system is beyond repair, reinstalling the OS helps. Back up files first to avoid losing data. Use a bootable USB or recovery disk.",

HowToCheckDisk: "Use CHKDSK to find and repair disk errors. Run it in command prompt with admin rights. Replace the disk if errors are unfixable.",

HowToRecoverFiles: "Accidentally deleted files may be restored using recovery tools. Stop using the drive to prevent overwriting. Professional recovery is the last option.",

HowToPartition: "Partitioning helps organize files. Use disk management tools to shrink or expand space. Always back up before adjusting partitions.",

HowToFormat: "Formatting erases all data on a drive. Use it to fix corruption or prepare for reuse. Ensure important files are backed up first.",

HowToSafeMode: "Safe Mode loads only basic drivers. Boot into it when troubleshooting crashes. It helps isolate faulty software or drivers.",

HowToSystemRestore: "System Restore reverts settings to an earlier date. Use it when updates or programs cause instability. It doesn’t affect personal files.",

HowToBackup: "Backups protect against data loss. Use external drives or cloud storage. Schedule regular backups for safety.",

HowToRestoreBackup: "Restoring from backup returns your files to a previous state. Use system tools or cloud services. Ensure the backup is recent and clean.",

HowToBIOSReset: "Resetting BIOS can fix startup issues. Use the jumper or remove the CMOS battery. Reconfigure settings after reset.",

HowToCleanDust: "Dust buildup causes overheating. Use compressed air to clean inside the PC. Keep it in a ventilated space to reduce dust collection.",

HowToCheckRAM: "Run memory diagnostic tools to test RAM. Faulty RAM causes crashes and blue screens. Replace bad sticks immediately.",

HowToReplaceGPU: "Remove old GPU drivers before replacement. Insert the new card and install drivers. Test with stress tools to ensure stability.",

HowToReplacePSU: "Shut down and unplug the PC before replacing PSU. Match wattage requirements with your hardware. Securely connect all cables.",

HowToReplaceHDD: "Clone your old HDD to a new one for data transfer. Install the drive and set it as bootable. Replace if the old one shows bad sectors.",

HowToReplaceSSD: "Upgrading to SSD improves speed. Migrate OS using cloning software. Reinstall OS for a clean setup if needed.",

HowToReplaceMotherboard: "Replacing a motherboard requires careful disassembly. Ensure CPU, RAM, and GPU compatibility. Reinstall drivers and OS after setup.",

HowToReapplyThermalPaste: "Old thermal paste reduces CPU cooling. Clean old paste with isopropyl alcohol. Apply a pea-sized amount of new paste evenly.",

HowToCleanRegistry: "Registry errors can cause instability. Use trusted cleaners cautiously. Always back up registry before editing.",

HowToUpdateOS: "OS updates fix bugs and improve security. Ensure stable internet and backup before updating. Restart to apply changes fully.",

HowToReinstallDrivers: "Corrupt drivers cause device failures. Uninstall them first, then reinstall. Restart PC to finish the process.",

HowToCheckTemperature: "Use monitoring software to check temps. Overheating indicates cooling issues. Ensure fans and heatsinks are working.",

HowToReplaceFan: "If the fan is noisy or dead, replace it. Match size and connector type. Test airflow after installation.",

HowToCheckBattery: "Laptop batteries degrade over time. Test health using system diagnostics. Replace if capacity drops below 50%.",

HowToCalibrateBattery: "Fully drain and recharge the battery. Repeat this cycle 2-3 times. It helps restore accurate charge readings.",

HowToReplaceKeyboard: "Shut down before replacing a laptop keyboard. Remove screws and cables carefully. Install new one and test keys.",

HowToReplaceMouse: "Wired mice simply plug in. Wireless require pairing or batteries. Replace if the sensor fails.",

HowToFixTouchpad: "Update touchpad drivers if unresponsive. Check BIOS for touchpad settings. Use external mouse if issue persists.",

HowToFixSpeakers: "Check audio settings and drivers. Test with headphones to isolate issue. Replace speakers if still no sound.",

HowToFixHeadphones: "Test headphones on another device. Check for loose connections. Replace cable if detachable.",

HowToFixMicrophone: "Update audio drivers if mic won’t work. Check input settings. Try a USB mic to bypass sound card issues.",

HowToFixWebcam: "Update camera drivers. Test with different apps. If hardware is faulty, use an external webcam.",

HowToFixUSB: "USB not detected? Try another port. Reinstall drivers if still broken. Replace cable if faulty.",

HowToFixHDMI: "HDMI problems may come from cables. Try another port or cable. Update GPU drivers if still no display.",

HowToFixLAN: "Wired internet may fail due to bad cable. Replace cable or reset router. Update network card drivers.",

HowToFixWiFi: "Restart router and PC if Wi-Fi drops. Forget and reconnect network. Update Wi-Fi card drivers.",

HowToFixBluetooth: "Unpair and repair the device. Update Bluetooth drivers. Restart Bluetooth service in Windows.",

HowToFixOverheat: "Ensure good airflow inside the case. Clean fans and heatsinks. Use a cooling pad for laptops.",

HowToFixSlowBoot: "Too many startup apps delay boot. Disable unneeded apps in Task Manager. Use SSD for faster boot times.",
brain: "The brain is the control center of the body. It processes information, stores memories, and coordinates actions. Protecting it with proper sleep and nutrition is vital.",
lungs: "The lungs are responsible for breathing and oxygen exchange. They filter the air we inhale and remove carbon dioxide. Healthy lungs are supported by avoiding smoking and pollution.",
liver: "The liver cleans toxins from the blood and aids in digestion. It also stores vitamins and minerals. A balanced diet supports liver health.",
kidneys: "The kidneys filter waste from the blood and produce urine. They also regulate water and mineral balance. Staying hydrated is important for kidney function.",
stomach: "The stomach helps break down food using acids and enzymes. It starts the digestion process before food moves to the intestines. Eating in moderation prevents stomach issues.",
intestines: "The intestines absorb nutrients and water from digested food. They are divided into the small and large intestines. A high-fiber diet supports intestinal health.",
bones: "Bones provide structure and support for the body. They also protect internal organs and store minerals. Calcium and vitamin D are important for strong bones.",
muscles: "Muscles allow movement and maintain posture. They work by contracting and relaxing. Regular exercise strengthens muscles.",
skin: "The skin is the body’s largest organ. It protects against germs, regulates temperature, and senses touch. Proper hydration keeps skin healthy.",
eyes: "Eyes allow us to see and interpret the world. They are complex organs with lenses, retinas, and nerves. Good vision depends on eye care and regular checkups.",
ears: "Ears help us hear sounds and maintain balance. They convert sound waves into signals the brain understands. Protecting ears from loud noise prevents damage.",
teeth: "Teeth help break down food for digestion. They also play a role in speech and appearance. Brushing and flossing daily keep teeth healthy.",
tongue: "The tongue helps with tasting, swallowing, and speaking. It has taste buds that detect sweet, salty, sour, and bitter. Good oral hygiene protects the tongue.",
nose: "The nose helps us breathe and smell. It filters air and traps dust before it enters the lungs. Keeping nasal passages clean supports health.",
heart: "The heart pumps blood through the circulatory system. It supplies oxygen and nutrients to tissues. A healthy lifestyle keeps the heart strong.",
blood: "Blood carries oxygen, nutrients, and hormones throughout the body. It also helps fight infections. Regular exercise promotes good circulation.",
veins: "Veins return deoxygenated blood back to the heart. They work with valves that prevent backflow. Healthy veins rely on movement and circulation.",
arteries: "Arteries carry oxygen-rich blood from the heart to the body. They are strong, elastic vessels. Keeping cholesterol low supports artery health.",
nerves: "Nerves transmit signals between the brain and body. They control movement, sensation, and reflexes. Protecting the nervous system ensures proper function.",
spine: "The spine supports the body and protects the spinal cord. It is made of vertebrae stacked in a column. Good posture keeps the spine aligned.",
apple: "Apples are sweet and crunchy fruits that come in many varieties. They are rich in fiber and vitamin C. Eating apples regularly supports digestion and boosts immunity.",
banana: "Bananas are soft, sweet fruits with a yellow peel. They are a great source of potassium, which supports heart health. Bananas also provide quick energy for the body.",
mango: "Mangoes are tropical fruits known for their sweet and juicy taste. They are high in vitamin A and vitamin C. Mangoes are often called the 'king of fruits' in many countries.",
orange: "Oranges are citrus fruits known for their refreshing flavor. They are packed with vitamin C, which boosts the immune system. Drinking fresh orange juice is a popular way to enjoy them.",
grape: "Grapes grow in clusters and can be eaten fresh or made into wine. They are rich in antioxidants like resveratrol. Grapes also make a healthy snack for boosting energy.",
watermelon: "Watermelons are large, juicy fruits mostly made of water. They are refreshing and perfect for hot weather. Watermelon is also a good source of vitamins A and C.",
pineapple: "Pineapples are tropical fruits with a spiky skin and sweet-sour taste. They contain bromelain, an enzyme that aids digestion. Pineapples are often used in juices and desserts.",
papaya: "Papayas are soft, orange-fleshed fruits with black seeds inside. They are rich in vitamin C and digestive enzymes. Eating papaya supports gut health.",
strawberry: "Strawberries are red, heart-shaped berries loved worldwide. They are full of vitamin C and antioxidants. Strawberries are often used in desserts and smoothies.",
blueberry: "Blueberries are small, round fruits with a sweet-tart flavor. They are known as superfoods for their high antioxidant content. Eating them regularly supports brain health.",
cherry: "Cherries are small, juicy fruits that can be sweet or sour. They are rich in vitamins and antioxidants. Cherries are also linked to better sleep due to melatonin.",
peach: "Peaches are soft, fuzzy-skinned fruits with sweet, juicy flesh. They are rich in vitamins A and C. Peaches are delicious when eaten fresh or used in desserts.",
pear: "Pears are sweet fruits with a grainy texture. They are high in fiber, which supports digestion. Pears are enjoyed fresh, baked, or canned.",
kiwi: "Kiwis are small, fuzzy fruits with green flesh inside. They are packed with vitamin C, potassium, and fiber. Kiwis support the immune system and digestion.",
lemon: "Lemons are sour citrus fruits with a bright yellow peel. They are a great source of vitamin C. Lemon juice is often used for drinks, cooking, and cleaning.",
lime: "Limes are small, green citrus fruits with a tangy taste. They are rich in vitamin C and antioxidants. Limes are often used in juices, marinades, and desserts.",
coconut: "Coconuts are tropical fruits with a hard shell and sweet water inside. The white flesh is used in cooking and desserts. Coconut oil is also extracted from it for many uses.",
pomegranate: "Pomegranates have tough skin but are filled with juicy seeds inside. They are rich in antioxidants and vitamins. Drinking pomegranate juice supports heart health.",
guava: "Guavas are tropical fruits with green skin and pink or white flesh. They are rich in vitamin C and dietary fiber. Guava can be eaten raw or made into juice.",
dragonfruit: "Dragonfruit has a unique look with bright pink skin and white or red flesh. It is rich in antioxidants, vitamin C, and fiber. Dragonfruit is often enjoyed in smoothies and salads.",
apricot: "Apricots are small, orange fruits with a sweet-tart flavor. They are rich in vitamin A and fiber. Apricots can be eaten fresh, dried, or used in jams.",
plum: "Plums are juicy fruits that can be sweet or tart. They are high in antioxidants and vitamins. Dried plums, known as prunes, help with digestion.",
blackberry: "Blackberries are dark, juicy berries rich in vitamins C and K. They are packed with antioxidants that support immunity. Blackberries are delicious fresh or in desserts.",
raspberry: "Raspberries are small red fruits with a sweet and tangy taste. They are high in fiber and vitamin C. Raspberries are popular in jams and pastries.",
cranberry: "Cranberries are tart red berries often made into juice or sauce. They are rich in antioxidants and vitamin C. Cranberries are known for supporting urinary tract health.",
fig: "Figs are soft, sweet fruits with tiny seeds inside. They are rich in fiber, calcium, and potassium. Figs can be eaten fresh or dried for snacks.",
date: "Dates are sweet, chewy fruits from the date palm tree. They are rich in natural sugars, fiber, and minerals. Dates are often used as natural sweeteners.",
passionfruit: "Passionfruits have a tough skin with juicy, seed-filled pulp inside. They are rich in vitamin C and antioxidants. Passionfruit is often used in juices and desserts.",
starfruit: "Starfruit, or carambola, is a tropical fruit shaped like a star when sliced. It has a sweet and tangy taste. Starfruit is low in calories but rich in vitamin C.",
lychee: "Lychees are small, round fruits with a bumpy red skin. They have juicy white flesh and a sweet taste. Lychees are rich in vitamin C and antioxidants.",
longan: "Longans are small, translucent fruits similar to lychees. They have a sweet flavor and are often eaten fresh. Longans are used in Asian desserts and teas.",
rambutan: "Rambutans are tropical fruits with hairy red skin and juicy white flesh. They are rich in vitamin C and iron. Rambutans taste sweet and slightly sour.",
jackfruit: "Jackfruits are large tropical fruits with spiky skin. Their yellow flesh is sweet and used in many dishes. Jackfruit seeds are also edible when cooked.",
durian: "Durians are known as the 'king of fruits' in Southeast Asia. They have a strong odor but a sweet and creamy flesh. Durians are rich in vitamins and minerals.",
sapodilla: "Sapodilla is a tropical fruit with a brown skin and sweet, grainy flesh. It tastes like caramel or brown sugar. Sapodilla is rich in vitamins and dietary fiber.",
soursop: "Soursop has spiky green skin and soft, tangy white flesh. It is rich in vitamin C and antioxidants. Soursop is often used in juices and desserts.",
mulberry: "Mulberries are small, dark berries that grow on trees. They are rich in iron, vitamin C, and fiber. Mulberries can be eaten fresh or dried.",
persimmon: "Persimmons are sweet, orange fruits often eaten fresh or dried. They are high in vitamin A and fiber. Persimmons are popular in Asian cuisine.",
quince: "Quinces are yellow fruits that are hard and sour when raw. They are usually cooked into jams or desserts. Quinces are rich in vitamin C and fiber.",
olive: "Olives are small, oval fruits grown on trees. They are often pickled or used to make olive oil. Olives are a source of healthy fats.",
tangerine: "Tangerines are small, sweet citrus fruits similar to oranges. They are easy to peel and full of vitamin C. Tangerines make a refreshing snack.",
clementine: "Clementines are seedless citrus fruits that are sweet and easy to peel. They are rich in vitamin C. Clementines are often eaten fresh by children.",
mandarin: "Mandarins are small, sweet citrus fruits with loose skin. They are full of vitamin C and antioxidants. Mandarins are often enjoyed during festive seasons.",
grapefruit: "Grapefruits are large, tangy citrus fruits that can be sweet or sour. They are rich in vitamin C and antioxidants. Grapefruit juice is a popular drink.",
pomelo: "Pomelos are the largest citrus fruits with thick skin. They taste sweet and mild compared to grapefruit. Pomelos are rich in vitamin C.",
custardapple: "Custard apples are green fruits with creamy, sweet flesh. They are rich in vitamin C and magnesium. Custard apples are often eaten fresh with a spoon.",
santol: "Santol is a tropical fruit with sour white flesh. It is used in candies and preserves. Santol is high in antioxidants and fiber.",
chico: "Chico, also called sapodilla, is sweet with a grainy texture. It tastes like caramel and brown sugar. Chico is rich in dietary fiber and vitamins.",
apricot: "Apricots are small, orange fruits with a sweet-tart flavor. They are rich in vitamin A and fiber. Apricots can be eaten fresh, dried, or used in jams.",
plum: "Plums are juicy fruits that can be sweet or tart. They are high in antioxidants and vitamins. Dried plums, known as prunes, help with digestion.",
blackberry: "Blackberries are dark, juicy berries rich in vitamins C and K. They are packed with antioxidants that support immunity. Blackberries are delicious fresh or in desserts.",
raspberry: "Raspberries are small red fruits with a sweet and tangy taste. They are high in fiber and vitamin C. Raspberries are popular in jams and pastries.",
cranberry: "Cranberries are tart red berries often made into juice or sauce. They are rich in antioxidants and vitamin C. Cranberries are known for supporting urinary tract health.",
fig: "Figs are soft, sweet fruits with tiny seeds inside. They are rich in fiber, calcium, and potassium. Figs can be eaten fresh or dried for snacks.",
date: "Dates are sweet, chewy fruits from the date palm tree. They are rich in natural sugars, fiber, and minerals. Dates are often used as natural sweeteners.",
passionfruit: "Passionfruits have a tough skin with juicy, seed-filled pulp inside. They are rich in vitamin C and antioxidants. Passionfruit is often used in juices and desserts.",
starfruit: "Starfruit, or carambola, is a tropical fruit shaped like a star when sliced. It has a sweet and tangy taste. Starfruit is low in calories but rich in vitamin C.",
lychee: "Lychees are small, round fruits with a bumpy red skin. They have juicy white flesh and a sweet taste. Lychees are rich in vitamin C and antioxidants.",
longan: "Longans are small, translucent fruits similar to lychees. They have a sweet flavor and are often eaten fresh. Longans are used in Asian desserts and teas.",
rambutan: "Rambutans are tropical fruits with hairy red skin and juicy white flesh. They are rich in vitamin C and iron. Rambutans taste sweet and slightly sour.",
jackfruit: "Jackfruits are large tropical fruits with spiky skin. Their yellow flesh is sweet and used in many dishes. Jackfruit seeds are also edible when cooked.",
durian: "Durians are known as the 'king of fruits' in Southeast Asia. They have a strong odor but a sweet and creamy flesh. Durians are rich in vitamins and minerals.",
sapodilla: "Sapodilla is a tropical fruit with a brown skin and sweet, grainy flesh. It tastes like caramel or brown sugar. Sapodilla is rich in vitamins and dietary fiber.",
soursop: "Soursop has spiky green skin and soft, tangy white flesh. It is rich in vitamin C and antioxidants. Soursop is often used in juices and desserts.",
mulberry: "Mulberries are small, dark berries that grow on trees. They are rich in iron, vitamin C, and fiber. Mulberries can be eaten fresh or dried.",
persimmon: "Persimmons are sweet, orange fruits often eaten fresh or dried. They are high in vitamin A and fiber. Persimmons are popular in Asian cuisine.",
quince: "Quinces are yellow fruits that are hard and sour when raw. They are usually cooked into jams or desserts. Quinces are rich in vitamin C and fiber.",
olive: "Olives are small, oval fruits grown on trees. They are often pickled or used to make olive oil. Olives are a source of healthy fats.",
tangerine: "Tangerines are small, sweet citrus fruits similar to oranges. They are easy to peel and full of vitamin C. Tangerines make a refreshing snack.",
clementine: "Clementines are seedless citrus fruits that are sweet and easy to peel. They are rich in vitamin C. Clementines are often eaten fresh by children.",
mandarin: "Mandarins are small, sweet citrus fruits with loose skin. They are full of vitamin C and antioxidants. Mandarins are often enjoyed during festive seasons.",
grapefruit: "Grapefruits are large, tangy citrus fruits that can be sweet or sour. They are rich in vitamin C and antioxidants. Grapefruit juice is a popular drink.",
pomelo: "Pomelos are the largest citrus fruits with thick skin. They taste sweet and mild compared to grapefruit. Pomelos are rich in vitamin C.",
custardapple: "Custard apples are green fruits with creamy, sweet flesh. They are rich in vitamin C and magnesium. Custard apples are often eaten fresh with a spoon.",
santol: "Santol is a tropical fruit with sour white flesh. It is used in candies and preserves. Santol is high in antioxidants and fiber.",
chico: "Chico, also called sapodilla, is sweet with a grainy texture. It tastes like caramel and brown sugar. Chico is rich in dietary fiber and vitamins.",
camu: "Camu camu is a small Amazonian berry. It is one of the richest sources of vitamin C. Camu camu is often used in supplements.",
acerola: "Acerola cherries are small red fruits. They are extremely high in vitamin C. Acerola is used in juices and health products.",
rowan: "Rowan berries are small, bright red fruits. They are sour and often used in jellies. Rowan berries are rich in antioxidants.",
boysenberry: "Boysenberries are hybrids of raspberries and blackberries. They are sweet, juicy, and full of vitamins. Boysenberries are used in jams and desserts.",
cloudberry: "Cloudberries are rare golden fruits found in cold regions. They are rich in vitamin C and antioxidants. Cloudberries are used in jams and liqueurs.",
gooseberry: "Gooseberries are small, tart fruits that can be green or red. They are rich in vitamin C and fiber. Gooseberries are used in desserts and chutneys.",
elderberry: "Elderberries are small, dark purple berries. They are used in syrups and teas for immune support. Elderberries are full of antioxidants.",
huckleberry: "Huckleberries are small, dark berries similar to blueberries. They are rich in vitamin C and iron. Huckleberries are often used in pies and jams.",
medlar: "Medlars are small brown fruits eaten when overripe. They have a sweet, apple-like taste. Medlars are traditional in European cuisine.",
salak: "Salak, or snake fruit, has reddish-brown scaly skin. Its flesh is sweet and crunchy. Salak is popular in Southeast Asia.",
jabuticaba: "Jabuticaba grows directly on the trunk of trees. The fruit is purple and grape-like. It is often used in jellies and wines.",
marang: "Marang is a tropical fruit with a sweet, custard-like flesh. It is related to jackfruit. Marang is highly perishable and eaten fresh.",
ackee: "Ackee is a tropical fruit from Jamaica. It must be eaten ripe, as unripe ackee is poisonous. Ackee is part of the national dish of Jamaica.",
breadfruit: "Breadfruit is a starchy tropical fruit. It is often cooked and used as a potato substitute. Breadfruit is rich in carbohydrates and vitamins.",
langsat: "Langsat is a small tropical fruit with translucent flesh. It is sweet and slightly sour. Langsat is rich in vitamins and minerals.",
loquat: "Loquats are small, yellow-orange fruits with a sweet-tart flavor. They are rich in vitamin A and antioxidants. Loquats are used in jams and syrups.",
miraclefruit: "Miracle fruit makes sour foods taste sweet. It contains a compound called miraculin. The fruit is often used for fun taste experiments.",
noni: "Noni is a tropical fruit with a strong odor. It is used in traditional medicine. Noni juice is believed to support immunity.",
tamarind: "Tamarind is a brown pod-like fruit with tangy pulp. It is used in cooking and drinks. Tamarind is rich in antioxidants and vitamin C.",
roseapple: "Rose apples are bell-shaped tropical fruits. They have a mild, sweet flavor and aroma like roses. Rose apples are refreshing and hydrating.",
sugarapple: "Sugar apples are tropical fruits with bumpy green skin. The flesh is sweet and creamy. They are rich in vitamins and minerals.",
whitecurrant: "Whitecurrants are small, translucent berries. They are sweet and less tart than red currants. Whitecurrants are rich in vitamin C.",
redcurrant: "Redcurrants are small, bright red berries. They have a tart flavor and are used in jellies. Redcurrants are rich in antioxidants.",
blackcurrant: "Blackcurrants are small dark berries. They are high in vitamin C and anthocyanins. Blackcurrants are used in juices and syrups.",
pricklypear: "Prickly pears are cactus fruits with spiny skin. They are sweet and rich in antioxidants. Prickly pears are often used in drinks and desserts.",
saskatoon: "Saskatoon berries are purple-blue fruits. They are rich in fiber and antioxidants. Saskatoons are used in pies and jams.",
seabuckthorn: "Sea buckthorn berries are orange fruits. They are rich in vitamin C and omega fatty acids. The berries are used in juices and oils.",
bilberry: "Bilberries are small blue fruits similar to blueberries. They are high in antioxidants. Bilberries are used in jams and eye health supplements.",
barberry: "Barberries are small, tart red berries. They are often used in Middle Eastern cooking. Barberries are rich in vitamin C.",
jostaberry: "Jostaberries are hybrids of gooseberries and currants. They are dark purple and taste sweet-tart. Jostaberries are high in vitamins.",
sapote: "Sapote is a tropical fruit with creamy, sweet flesh. Different types include black, white, and mamey sapote. Sapotes are nutrient-rich and eaten fresh.",
mamey: "Mamey sapote has brown skin and bright orange flesh. It tastes sweet and creamy. Mamey is rich in vitamins and fiber.",
pitanga: "Pitanga, or Surinam cherry, is a small red tropical fruit. It has a sweet-sour flavor. Pitanga is used in juices and jams.",
ugli: "Ugli fruit is a Jamaican hybrid of grapefruit, orange, and tangerine. It has a sweet and tangy taste. Ugli fruit is rich in vitamin C.",
ambarella: "Ambarella is a tropical fruit with golden skin and crunchy flesh. It tastes tangy and refreshing. Ambarella is often eaten with salt or spices.",
jambul: "Jambul, or Java plum, is a purple fruit with a sweet-tart flavor. It is rich in iron and antioxidants. Jambul is used in juices and jams.",
melon: "Melons are sweet, juicy fruits that come in many varieties. They are hydrating and full of vitamins. Melons are refreshing in hot weather.",
cantaloupe: "Cantaloupes are orange-fleshed melons with a sweet taste. They are rich in vitamin A and hydration. Cantaloupes are often eaten fresh or in salads.",
Inception: "Inception (2010) - A sci-fi thriller by Christopher Nolan about dream infiltration.",
  Titanic: "Titanic (1997) - A romance and disaster epic directed by James Cameron.",
  Avatar: "Avatar (2009) - A sci-fi set on Pandora exploring humans vs Na'vi conflicts.",
  Interstellar: "Interstellar (2014) - Nolan's space odyssey about saving humanity.",
  TheGodfather: "The Godfather (1972) - Crime epic about the Corleone mafia family.",
  TheDarkKnight: "The Dark Knight (2008) - Batman faces the Joker in Nolan’s acclaimed superhero film.",
  ForrestGump: "Forrest Gump (1994) - A heartwarming story of a simple man witnessing key events in history.",
  TheMatrix: "The Matrix (1999) - Sci-fi action film about humans trapped in a simulated reality.",
  Gladiator: "Gladiator (2000) - A Roman general seeks revenge after betrayal.",
  ShawshankRedemption: "The Shawshank Redemption (1994) - Story of hope and friendship inside prison.",
  PulpFiction: "Pulp Fiction (1994) - Quentin Tarantino’s cult classic intertwining crime stories.",
  SchindlersList: "Schindler’s List (1993) - True story of a man saving Jews during the Holocaust.",
  TheLionKing: "The Lion King (1994) - Disney’s animated epic about Simba’s journey to be king.",
  AvengersEndgame: "Avengers: Endgame (2019) - Marvel heroes unite to defeat Thanos.",
  BlackPanther: "Black Panther (2018) - A Marvel film celebrating African culture and heroism.",
  StarWarsANewHope: "Star Wars: A New Hope (1977) - The saga begins with Luke Skywalker fighting the Empire.",
  EmpireStrikesBack: "The Empire Strikes Back (1980) - Dark sequel with the famous ‘I am your father’ reveal.",
  ReturnOfTheJedi: "Return of the Jedi (1983) - Rebels fight to end the Empire’s tyranny.",
  JurassicPark: "Jurassic Park (1993) - Dinosaurs brought back to life cause chaos on an island.",
  TheAvengers: "The Avengers (2012) - Earth’s mightiest heroes team up for the first time.",
  IronMan: "Iron Man (2008) - Tony Stark becomes the armored Avenger, launching the MCU.",
  CaptainAmericaWinterSoldier: "Captain America: The Winter Soldier (2014) - Steve Rogers uncovers Hydra within SHIELD.",
  DoctorStrange: "Doctor Strange (2016) - A surgeon learns the mystic arts to protect reality.",
  SpiderManNoWayHome: "Spider-Man: No Way Home (2021) - Multiverse chaos with three Spider-Men.",
  GuardiansOfTheGalaxy: "Guardians of the Galaxy (2014) - A misfit group saves the galaxy with humor and music.",
  ThorRagnarok: "Thor: Ragnarok (2017) - Thor faces Hela while teaming with Hulk on Sakaar.",
  WonderWoman: "Wonder Woman (2017) - Diana, an Amazon warrior, joins WWI to fight Ares.",
  ManOfSteel: "Man of Steel (2013) - Superman’s modern origin story directed by Zack Snyder.",
  JusticeLeagueSnyderCut: "Zack Snyder’s Justice League (2021) - The epic 4-hour cut of DC heroes uniting.",
  Joker: "Joker (2019) - Dark origin story of Arthur Fleck’s transformation into the Joker.",
  TheBatman: "The Batman (2022) - Robert Pattinson’s gritty detective version of Batman.",
  Frozen: "Frozen (2013) - Disney’s hit about Elsa, Anna, and the song ‘Let It Go’.",
  Moana: "Moana (2016) - A girl sails across the ocean to restore the heart of Te Fiti.",
  Coco: "Coco (2017) - Pixar’s celebration of Mexican Day of the Dead and family.",
  InsideOut: "Inside Out (2015) - Pixar’s story about emotions inside a young girl’s mind.",
  ToyStory: "Toy Story (1995) - Pixar’s first full CGI movie about toys coming to life.",
  FindingNemo: "Finding Nemo (2003) - A clownfish father searches the ocean for his lost son.",
  Up: "Up (2009) - An old man flies his house with balloons on a grand adventure.",
  Ratatouille: "Ratatouille (2007) - A rat dreams of being a chef in Paris.",
  Brave: "Brave (2012) - A Scottish princess defies tradition to change her fate.",
  Aladdin: "Aladdin (1992) - Disney’s tale of a street rat who finds a magic lamp.",
  BeautyAndTheBeast: "Beauty and the Beast (1991) - Disney’s story of love beyond appearances.",
  Mulan: "Mulan (1998) - A young woman disguises herself as a man to fight for China.",
  Hercules: "Hercules (1997) - Disney’s take on the Greek hero becoming a true hero.",
  Tangled: "Tangled (2010) - Rapunzel leaves her tower for adventure with Flynn Rider.",
  Zootopia: "Zootopia (2016) - A bunny cop and fox solve a conspiracy in the city of animals.",
  Encanto: "Encanto (2021) - Disney’s story of the magical Madrigal family in Colombia.",
  Luca: "Luca (2021) - A coming-of-age Pixar film about sea monsters and friendship.",
  Soul: "Soul (2020) - Pixar’s exploration of life, death, and purpose through music.",
  TurningRed: "Turning Red (2022) - Pixar’s story about a girl turning into a red panda.",
  TheLordOfTheRingsFellowship: "The Lord of the Rings: The Fellowship of the Ring (2001) - Directed by Peter Jackson, this epic fantasy introduces Frodo Baggins and the quest to destroy the One Ring.\n\nThe film showcases breathtaking New Zealand landscapes, deep friendships, and the corrupting influence of power.\n\nIt became a landmark in modern cinema, launching one of the most successful trilogies ever made.",

HarryPotterSorcerersStone: "Harry Potter and the Sorcerer’s Stone (2001) - The beginning of the Harry Potter saga where young Harry discovers he is a wizard.\n\nIt introduces Hogwarts, iconic characters like Hermione and Ron, and the first battle against Voldemort’s dark influence.\n\nThe film sparked a global phenomenon, turning J.K. Rowling’s books into one of the biggest franchises in movie history.",
TheLordOfTheRingsFellowship: "The Lord of the Rings: The Fellowship of the Ring (2001) - Directed by Peter Jackson, this epic fantasy introduces Frodo Baggins and the quest to destroy the One Ring.\n\nThe film showcases breathtaking New Zealand landscapes, deep friendships, and the corrupting influence of power.\n\nIt became a landmark in modern cinema, launching one of the most successful trilogies ever made.",

TheLordOfTheRingsTwoTowers: "The Lord of the Rings: The Two Towers (2002) continues Frodo’s journey while introducing Gollum as a key character.\n\nThe film is notable for its large-scale battles, especially Helm’s Deep, which set a new standard for fantasy warfare.\n\nIt deepened the mythology of Middle-earth and raised the stakes for the final chapter.",

TheLordOfTheRingsReturnKing: "The Lord of the Rings: The Return of the King (2003) concluded the trilogy with epic battles and emotional farewells.\n\nIt won 11 Academy Awards, tying the record for most Oscars in history.\n\nThe movie remains a cultural milestone, celebrated for its storytelling and visual achievements.",

HarryPotterSorcerersStone: "Harry Potter and the Sorcerer’s Stone (2001) begins the magical saga of the boy who lived.\n\nIt introduces audiences to Hogwarts, Diagon Alley, and iconic friendships that shaped a generation.\n\nThe film’s success launched one of the most beloved franchises in cinema.",

HarryPotterChamberSecrets: "Harry Potter and the Chamber of Secrets (2002) delves deeper into Hogwarts mysteries.\n\nThe story brings new magical creatures, darker themes, and the introduction of Dobby the house-elf.\n\nIt cemented the series as more than a children’s fantasy, expanding its worldwide following.",

HarryPotterPrisonerAzkaban: "Harry Potter and the Prisoner of Azkaban (2004) shifts tone with Alfonso Cuarón’s darker direction.\n\nThe movie introduces Sirius Black and the time-turner, adding complexity to the story.\n\nMany fans consider it one of the strongest entries for its emotional depth and visual style.",

HarryPotterGobletFire: "Harry Potter and the Goblet of Fire (2005) shows Harry entering a dangerous tournament.\n\nThe Triwizard challenges bring high tension, and the return of Voldemort raises the stakes.\n\nThe ending shocked fans, signaling the series’ turn into darker territory.",

HarryPotterOrderPhoenix: "Harry Potter and the Order of the Phoenix (2007) follows Harry battling skepticism as Voldemort’s rise spreads fear.\n\nIt introduces Dolores Umbridge and the secret Dumbledore’s Army.\n\nThe emotional battle at the Ministry of Magic left a lasting impact on fans.",

HarryPotterHalfBloodPrince: "Harry Potter and the Half-Blood Prince (2009) explores Voldemort’s past and the mystery of Horcruxes.\n\nThe tragic death of Dumbledore marked a pivotal moment in the saga.\n\nThe darker tone prepared audiences for the final two films.",

HarryPotterDeathlyHallows1: "Harry Potter and the Deathly Hallows Part 1 (2010) sees Harry, Hermione, and Ron on the run.\n\nThe film emphasizes their bond while exploring themes of sacrifice and survival.\n\nIt builds suspense for the climactic final battle.",

HarryPotterDeathlyHallows2: "Harry Potter and the Deathly Hallows Part 2 (2011) delivers the epic conclusion at Hogwarts.\n\nThe final showdown between Harry and Voldemort became legendary.\n\nIt broke box office records and closed the saga on an emotional high.",

TheHobbitUnexpectedJourney: "The Hobbit: An Unexpected Journey (2012) returns to Middle-earth before LOTR.\n\nBilbo joins Gandalf and dwarves on a quest to reclaim Erebor.\n\nThough divisive, it rekindled Tolkien’s world for a new generation.",

TheHobbitDesolationSmaug: "The Hobbit: The Desolation of Smaug (2013) features Bilbo’s famous encounter with the dragon Smaug.\n\nThe visuals and Benedict Cumberbatch’s voice work brought the dragon to life.\n\nIt set up the climactic battles of the trilogy’s end.",

TheHobbitBattleFiveArmies: "The Hobbit: The Battle of the Five Armies (2014) concludes Bilbo’s journey.\n\nIt delivers grand-scale battles between men, elves, dwarves, and orcs.\n\nThe movie ties directly into the Lord of the Rings saga.",

Frozen2: "Frozen II (2019) expands Elsa and Anna’s story beyond Arendelle.\n\nIt explores themes of identity, history, and confronting the past.\n\nThe sequel was praised for its songs and stunning animation.",

TheIncredibles: "The Incredibles (2004) follows a family of superheroes hiding from society.\n\nIt blends action, humor, and family drama seamlessly.\n\nThe film became a Pixar classic, beloved across all ages.",

TheIncredibles2: "The Incredibles 2 (2018) continues the family’s story with Elastigirl in the spotlight.\n\nIt updates the superhero theme for modern times while focusing on family dynamics.\n\nFans waited 14 years, and the movie delivered both action and heart.",

Shrek: "Shrek (2001) parodies fairy tales while telling the story of an ogre’s unlikely love.\n\nThe humor, heart, and soundtrack made it an instant classic.\n\nIt changed the landscape of animated films with its irreverent style.",

Shrek2: "Shrek 2 (2004) continues Shrek and Fiona’s story, introducing Puss in Boots.\n\nThe film was praised for its humor, animation, and catchy soundtrack.\n\nIt became one of the most successful animated sequels ever made.",

ShrekForeverAfter: "Shrek Forever After (2010) closes the series with Shrek wishing for a different life.\n\nThe film explores themes of family, regret, and appreciating what you have.\n\nThough not as acclaimed as earlier entries, it gave closure to fans.",

KungFuPanda: "Kung Fu Panda (2008) introduces Po, an unlikely kung fu hero.\n\nIt blends action, comedy, and heartfelt lessons about self-belief.\n\nThe film’s visuals and humor made it a standout DreamWorks hit.",

KungFuPanda2: "Kung Fu Panda 2 (2011) explores Po’s origins while raising the stakes.\n\nIt features emotional storytelling alongside breathtaking action sequences.\n\nFans and critics praised it as a strong sequel.",

KungFuPanda3: "Kung Fu Panda 3 (2016) sees Po meeting his biological father.\n\nThe story expands the panda lore while delivering humor and heart.\n\nIt completed the trilogy with a satisfying conclusion.",

Madagascar: "Madagascar (2005) follows zoo animals stranded in the wild.\n\nIts humor and quirky characters made it a family favorite.\n\nThe film spawned several sequels and spin-offs.",

MadagascarEscape2Africa: "Madagascar: Escape 2 Africa (2008) continues the animals’ journey.\n\nThey meet Alex’s family while adjusting to life in the wild.\n\nThe film expanded the world and character depth.",

MadagascarEuropeMostWanted: "Madagascar 3: Europe’s Most Wanted (2012) takes the animals on a circus adventure.\n\nIts colorful visuals and music made it a hit with families.\n\nIt closed the trilogy with energy and fun.",

DespicableMe: "Despicable Me (2010) introduces Gru, a villain with a soft heart.\n\nThe Minions became a cultural phenomenon.\n\nIts blend of humor and heart made it a global success.",

DespicableMe2: "Despicable Me 2 (2013) continues Gru’s story as he faces new villains.\n\nThe film’s humor and family themes kept audiences entertained.\n\nIt reinforced the Minions’ popularity worldwide.",

DespicableMe3: "Despicable Me 3 (2017) shows Gru discovering his twin brother.\n\nThe film mixes action, comedy, and family drama.\n\nThough divisive, it extended the franchise’s success.",

Minions: "Minions (2015) explores the origins of Gru’s yellow helpers.\n\nTheir slapstick humor drove the film’s popularity.\n\nIt became a massive box office success despite mixed reviews.",

Sing: "Sing (2016) follows animals competing in a singing competition.\n\nIt combines humor, music, and heartfelt character arcs.\n\nThe film’s soundtrack and animation earned praise.",

Sing2: "Sing 2 (2021) continues the story with bigger dreams and stages.\n\nThe sequel adds new characters and musical numbers.\n\nFans enjoyed its colorful visuals and emotional beats.",

BigHero6: "Big Hero 6 (2014) blends superheroes with heartwarming friendship.\n\nBaymax became an instant fan favorite.\n\nIt won the Academy Award for Best Animated Feature.",

WreckItRalph: "Wreck-It Ralph (2012) explores video game worlds through Ralph’s redemption.\n\nIts creativity and humor resonated with gamers and families alike.\n\nThe film became a standout Disney hit.",

RalphBreaksInternet: "Ralph Breaks the Internet (2018) takes Ralph and Vanellope into the online world.\n\nIt parodies internet culture while telling a story of friendship.\n\nThe film expanded the franchise with modern themes.",

MonstersInc: "Monsters, Inc. (2001) follows Sulley and Mike in a world powered by children’s screams.\n\nIts humor and heart made it a Pixar classic.\n\nThe film introduced unforgettable characters and a unique setting.",

MonstersUniversity: "Monsters University (2013) is a prequel showing Mike and Sulley’s college days.\n\nIt explores their friendship and rivalry origins.\n\nThe film was praised for its humor and vibrant animation.",

Cars: "Cars (2006) tells the story of Lightning McQueen learning humility.\n\nIt celebrates small-town life and personal growth.\n\nThe film launched a successful Pixar franchise.",

Cars2: "Cars 2 (2011) shifts into a spy adventure featuring Mater.\n\nThough divisive, it expanded the Cars universe.\n\nThe film kept the franchise alive for younger fans.",

Cars3: "Cars 3 (2017) returns to Lightning’s racing journey.\n\nIt focuses on mentorship and passing the torch.\n\nThe film redeemed the series with heartfelt storytelling.",

Braveheart: "Braveheart (1995) tells the story of William Wallace leading Scotland’s fight for freedom.\n\nMel Gibson’s direction and performance were widely praised.\n\nThe film won five Academy Awards including Best Picture.",

Gladiator: "Gladiator (2000) follows a betrayed Roman general seeking justice.\n\nIts epic battles and emotional story captivated audiences.\n\nIt won multiple Oscars and remains a classic of the genre.",

Troy: "Troy (2004) adapts Homer’s Iliad with Brad Pitt as Achilles.\n\nIt dramatizes the legendary Trojan War with grandeur.\n\nThe film remains popular for its action and mythological scale.",

300: "300 (2006) tells the story of the Battle of Thermopylae.\n\nIts stylized visuals and action sequences became iconic.\n\nThe film popularized a new approach to graphic novel adaptations.",

Spartacus: "Spartacus (1960) is a classic epic about a slave revolt in ancient Rome.\n\nDirected by Stanley Kubrick, it starred Kirk Douglas.\n\nIt remains influential as one of the great historical dramas.",

BenHur: "Ben-Hur (1959) tells the story of betrayal and revenge in ancient Rome.\n\nThe chariot race remains one of the most famous sequences in cinema history.\n\nIt won 11 Academy Awards, a record at the time.",
TheHowsOfUs: "The Hows of Us (2018) - A romantic drama directed by Cathy Garcia-Molina about a couple whose relationship is tested by long distance and life’s unexpected demands.\n\nKathryn Bernardo and Daniel Padilla star as Primo and George, whose dreams diverge as they try to build a life together. The film explores trust, sacrifice, and the meaning of home.\n\nIt became one of the highest grossing Filipino films, resonating deeply with audiences for its emotional honesty and strong performances." ,

HelloLoveGoodbye: "Hello, Love, Goodbye (2019) - A drama/romance by Cathy Garcia-Molina centering on Joy and Ethan, overseas Filipino workers trying to balance duty, love, and identity.\n\nJoy works abroad while Ethan builds a life in the Philippines, and their relationship bridges career, family, and cultural divides. Their choice forces them to confront what it means to belong.\n\nThe film was a massive commercial success, becoming among the top grossers in PH, and praised for its authentic portrayal of OFW experience and stellar acting." ,

TheMistress: "The Mistress (2012) - Romantic melodrama directed by Olivia Lamasan about forbidden love, guilt, and the price people pay for their secrets.\n\nJohn Lloyd Cruz and Bea Alonzo portray characters bound by regret, longing, and societal expectations. Their chemistry and the moral tension give the story depth.\n\nThe film was well received, set box office records, and is often cited as one of PH’s modern classics in romance cinema." ,

BeautyAndTheBestie: "Beauty and the Bestie (2015) - Action-comedy directed by Wenn V. Deramas starring Vice Ganda and Coco Martin, mixing humor, family and spectacle.\n\nThe plot follows a celebrity bodyguard who has to protect two brothers, which leads to madcap chases, identity mix-ups, and dramatic moments. It balances slapstick and emotional stakes.\n\nIt was one of the highest-grossing Filipino films of its time, embraced by mass audiences for its entertainment value and comedic energy." ,

DukotPH: "Dukot (2016) - A suspense thriller by Paul Soriano about a young man who is kidnapped; based loosely on corruption, ransom, and moral dilemmas.\n\nThe victim’s family must wrestle with crime, fear, and the media scrutiny while trying to save him. The film shows both desperation and the impacts of trauma on ordinary people.\n\nAudiences praised its pacing, performances, and the heavy emotional toll, making it a standout in recent Filipino suspense films." ,

QuezonsGame: "Quezon’s Game (2018) - Historical drama inspired by real events when Manuel L. Quezon opened the Philippines to Jewish refugees during WWII.\n\nThe story follows the moral courage of those who risked against political pressure and rising global antisemitism. Scenes show compassion, political tension, and humanitarian sacrifice.\n\nIt received critical acclaim for bringing a lesser-known part of PH history to light, with strong performances and thoughtful storytelling." ,
LoloAndTheKid: "Lolo and the Kid (2024) – A heartfelt drama directed by Benedict Mique that centers on an adult hustler who crosses paths with a child in need.\n\nEuwenn Mikaell plays the Kid, a young boy trying to survive harsh circumstances, while Joel Torre portrays the Lolo whose world is disrupted by the unexpected bond they form. Their unlikely relationship becomes a journey of hope, struggle, and healing.\n\nThe film premiered on Netflix and quickly resonated with audiences in the Philippines, topping local streaming charts for its emotional depth and performances." ,

TatlongBibe: "Tatlong Bibe (2017) – A musical comedy-drama written and directed by Joven Tan about three young children whose lives intersect through a shared love of singing.\n\nLyca Gairanod, Raikko Mateo, and Marco Masa star alongside veteran actors like Eddie Garcia, bringing heart, innocence, and intergenerational tension to the screen. The themes of family, identity, childhood, and loss underlie the songs and scenes.\n\nThough light in moments, the film also explores grief and the bonds that tie people together. It was notable for its ensemble cast and soundtrack, becoming a memorable entry in Filipino family cinema." ,

TulaParaKayStella: "100 Tula Para Kay Stella (2017) – A romantic film by Jason Paul Laxamana following a young college student who composes 100 poems for the woman he loves, Stella.\n\nBela Padilla plays Stella, aspiring to be a rock star, while JC Santos is the poet trying to express feelings through words while grappling with self-worth and fear. The storytelling uses poetry and music as emotional anchors, interspersed with everyday challenges of youth and love.\n\nThe film struck a chord with audiences, especially among younger viewers, for its honest look at longing, heartbreak, and the beauty of trying—even when fears hold you back." ,
ManilaClawsOfLight: "Manila in the Claws of Light (1975) – A neo-noir drama by Lino Brocka that tells the story of Julio, a man from the province, who journeys to Manila to reunite with his lover, Ligaya.\n\nOnce in Manila, he encounters poverty, exploitation, and moral decay, struggling to survive the harsh realities of the city. The film explores themes of disillusionment, corruption, and the loss of innocence.\n\nCritically acclaimed, it is considered one of the greatest Philippine films of all time. Brocka’s vision and the film’s unflinching look at urban life continue to resonate with audiences.:contentReference[oaicite:0]{index=0}",

Sidhi: "Sidhi (1999) – Directed by Joel Lamangan, this drama revolves around a man’s sacrifice and redemption in the rural provinces.\n\nBased on Rolando Tinio’s Palanca-winning teleplay, the film delves into themes of love, guilt, identity, and family responsibility. The setting amplifies the emotional intensity and the characters’ internal struggles.\n\nSidhi won multiple supporting actress awards in the Philippines, with performances by Nora Aunor, Albert Martinez, and Glydel Mercado earning praise.:contentReference[oaicite:1]{index=1}",

Birdshot: "Birdshot (2016) – A crime-drama film directed by Mikhail Red, focusing on a young farm girl who accidentally kills one of the country’s last Philippine eagles.\n\nHer act triggers a chain of events involving criminal investigations and political corruption, all woven into the socio-ecological issues affecting rural communities. The film blends haunting visuals with social commentary.\n\nIt was praised for its cinematography, thematic depth, and has been featured in local and international film festivals for shining light on environmental and moral issues in modern Philippine society.:contentReference[oaicite:2]{index=2}",

Kubrador: "Kubrador (2006) – Follows the life of a woman who works as a bet collector in Manila’s numbers game underworld.\n\nAmid poverty and daily hardships, she tries to protect her integrity while caring for her children. It shows the struggle of ordinary people trapped in cycles of economic inequality.\n\nThe film is noted for its realism, empathy for the marginalized, and powerful storytelling that does not rely on sensationalism.:contentReference[oaicite:3]{index=3}",

OnTheJob: "On the Job (2013) – Directed by Erik Matti, this crime thriller revolves around prisoners who are temporarily released to carry out contract killings for powerful figures.\n\nThe film explores corruption, moral ambiguity, and the link between prison and politics, while also depicting the personal costs to those involved. The intersecting lives of characters show how systemic violence is upheld.\n\nIt gained recognition for its gritty realism, tight direction, and commentary on justice in the Philippines.:contentReference[oaicite:4]{index=4}",

JoseRizal: "Jose Rizal (1998) – A historical biopic by Marilou Abaya about the national hero Dr. José Rizal and his life under Spanish colonial rule.\n\nThe film portrays his intellectual growth, his writings that inspired a revolution, and the personal struggles he faced due to censorship, exile, and persecution. It also shows the social injustices in colonial Philippines.\n\nWidely regarded as one of the most important Philippine historical films, it won many awards and is often a reference point for history and identity in Filipino culture.:contentReference[oaicite:5]{index=5}",

OroPlataMata: "Oro, Plata, Mata (1982) – Directed by Peque Gallaga, this film traces the decline of two wealthy Filipino families during World War II.\n\nSet in Negros province, it contrasts the pastoral life before war and the chaos that war brings — loss, survival, moral compromise, and human cruelty. The structure of the film reflects how prosperity turns to tragedy.\n\nThe film is acclaimed for its rich visuals, powerful storytelling, and depth in exploring the human condition under upheaval.:contentReference[oaicite:6]{index=6}",

Himala: "Himala (1982) – Directed by Ishmael Bernal and starring Nora Aunor, this film is about a woman who claims to have seen an apparition, leading a village to believe miracles may happen.\n\nThemes of faith, skepticism, collective hysteria, and social pressure unfold in a small rural community. The story examines how people cope under belief, hope, and desperation.\n\nIt is frequently listed among the best Filipino movies, and its iconic line “Walang Himala!” remains part of Filipino cultural memory.:contentReference[oaicite:7]{index=7}",

Kisapmata: "Kisapmata (1981) – A psychological drama by Mike de Leon, focused on a young woman trapped in her father’s oppressive authority and a suffocating home.\n\nThe film portrays themes of patriarchy, desire, mental suffering, and fear. Subtle, intense performances and direction give the sense of claustrophobia and internal conflict.\n\nKisapmata is highly regarded critically and remains influential for its craftsmanship and emotional impact.:contentReference[oaicite:8]{index=8}",
SwordArtOnline: "Sword Art Online begins when thousands of players are trapped inside a virtual reality MMORPG, unable to log out. Kirito, a skilled player, must fight his way through the deadly game where dying inside means dying in real life.\n\nThe anime explores the boundaries between reality and virtual worlds, as Kirito forms bonds, faces moral challenges, and uncovers dark secrets behind the games.\n\nWhile polarizing, Sword Art Online became a massive hit, sparking debates on technology, relationships, and identity in the digital age.",

TokyoGhoul: "Tokyo Ghoul is set in a world where flesh-eating ghouls live hidden among humans. The story follows Kaneki, a college student who becomes half-ghoul after a fateful encounter.\n\nThe anime examines identity, morality, and survival as Kaneki struggles to live between two worlds while facing persecution and inner conflict.\n\nTokyo Ghoul gained popularity for its dark tone, tragic characters, and exploration of what it means to be human in a cruel society.",

NeonGenesisEvangelion: "Neon Genesis Evangelion follows teenagers piloting giant mechs called Evangelions to fight mysterious beings known as Angels. Shinji Ikari, the reluctant protagonist, embodies themes of trauma and alienation.\n\nThe anime blends action with deep psychological and philosophical commentary, challenging viewers to confront questions of existence and purpose.\n\nEvangelion is considered one of the most influential anime ever created, shaping mecha and storytelling in anime for decades.",

FairyTail: "Fairy Tail follows the adventures of Natsu Dragneel, a fire wizard, and his guildmates in the magical land of Fiore. The anime emphasizes camaraderie, loyalty, and the strength found in friendship.\n\nEach arc combines humor, action, and emotional stakes, as characters confront enemies while supporting one another.\n\nFairy Tail became a fan favorite, known for its fun atmosphere, epic fights, and heartfelt bonds between guild members.",

BlackClover: "Black Clover centers on Asta and Yuno, orphans raised together with dreams of becoming the Wizard King. Asta, born without magic, relies on determination and anti-magic abilities.\n\nThe anime showcases intense rivalries, teamwork, and personal growth as the duo faces powerful foes.\n\nBlack Clover has been praised for its energy, dynamic battles, and the underdog story that inspires viewers to never give up.",

JujutsuKaisen: "Jujutsu Kaisen follows Yuji Itadori, a high schooler who becomes host to a cursed spirit named Sukuna after ingesting a dangerous relic. He joins a group of sorcerers to fight curses.\n\nThe anime combines fast-paced battles with emotional depth, exploring themes of loss and the will to keep moving forward.\n\nJujutsu Kaisen exploded in popularity for its crisp animation, well-written characters, and stylish combat.",

CodeGeass: "Code Geass tells the story of Lelouch, a prince who gains the power of Geass, allowing him to command anyone. He uses this gift to lead a rebellion against a tyrannical empire.\n\nThe anime blends mecha action with political intrigue, betrayal, and moral dilemmas. Lelouch’s intelligence and charisma drive the series.\n\nCode Geass is praised for its twists, layered characters, and one of the most memorable endings in anime history.",

SoulEater: "Soul Eater takes place at the Death Weapon Meister Academy, where students train to battle evil using weapons that are also human. Maka and her weapon partner Soul form the core duo.\n\nThe anime combines gothic aesthetics, humor, and high-energy battles, while exploring themes of courage and madness.\n\nSoul Eater stood out for its unique art style and vibrant characters, making it a cult favorite.",

Inuyasha: "Inuyasha follows Kagome, a modern-day girl transported to feudal Japan, where she meets Inuyasha, a half-demon. Together, they search for the shards of the Shikon Jewel.\n\nThe anime mixes romance, adventure, and supernatural battles, with the central relationship between Inuyasha and Kagome being its emotional core.\n\nInuyasha became a beloved classic, known for its long run, memorable characters, and heartfelt storytelling.",

YuYuHakusho: "Yu Yu Hakusho tells the story of Yusuke Urameshi, a delinquent who dies saving a child and is given a second chance as a Spirit Detective. He investigates supernatural crimes and fights powerful demons.\n\nThe anime balances action with character growth, highlighting themes of redemption and friendship.\n\nA staple of '90s anime, Yu Yu Hakusho is celebrated for its iconic fights and emotional arcs.",

CowboyBebop: "Cowboy Bebop follows Spike Spiegel and his crew of bounty hunters as they travel through space, chasing criminals while facing their pasts. Each episode mixes genres, from noir to comedy.\n\nThe anime explores loneliness, existentialism, and human connection, supported by a legendary jazz soundtrack.\n\nCowboy Bebop remains a timeless masterpiece, influencing anime and Western media alike with its style and themes.",

SamuraiChamploo: "Samurai Champloo tells the story of Fuu, a waitress who recruits two wandering swordsmen, Mugen and Jin, for a journey across Edo-era Japan. The anime fuses historical themes with hip-hop culture.\n\nEach episode delivers unique adventures, combining humor, philosophy, and stylized combat.\n\nKnown for its creativity and soundtrack, Samurai Champloo is regarded as an artistic and cultural gem in anime.",

RurouniKenshin: "Rurouni Kenshin follows a wandering swordsman who vows never to kill again after his violent past as an assassin. He protects the innocent while confronting enemies tied to his history.\n\nThe anime reflects themes of redemption, peace, and the consequences of violence.\n\nRurouni Kenshin is admired for its blend of history, romance, and thrilling sword fights.",

Trigun: "Trigun centers on Vash the Stampede, a gunman with a mysterious past and a reputation for destruction, despite his pacifist nature. Set in a desert wasteland, the anime blends Western and sci-fi genres.\n\nThe series balances comedy with serious moral questions about violence and forgiveness.\n\nTrigun is a classic that endures for its unique protagonist and heartfelt storytelling.",

SteinsGate: "Steins;Gate follows Rintarou Okabe, a self-proclaimed mad scientist who accidentally discovers time travel through a microwave. With his friends, he becomes entangled in conspiracies.\n\nThe anime combines science fiction with emotional character arcs, exploring fate, choice, and sacrifice.\n\nSteins;Gate is hailed as one of the best sci-fi anime, renowned for its clever narrative and emotional impact.",

ParanoiaAgent: "Paranoia Agent is a psychological thriller about a mysterious attacker called 'Lil' Slugger' who assaults people across Tokyo. Each case reveals hidden fears and societal pressures.\n\nThe anime explores the dark side of human psychology, blending surrealism with mystery.\n\nCreated by Satoshi Kon, Paranoia Agent is regarded as a haunting masterpiece of psychological storytelling.",

Monster: "Monster follows Dr. Tenma, a Japanese surgeon in Germany who saves a boy destined to become a monstrous killer. Wracked with guilt, Tenma sets out to stop the evil he helped create.\n\nThe anime is a slow-burn thriller, exploring morality, justice, and the darkness within human nature.\n\nMonster is widely praised for its suspenseful storytelling and philosophical depth.",

GreatTeacherOnizuka: "Great Teacher Onizuka (GTO) follows Eikichi Onizuka, a former gang member turned teacher who wants to be the greatest high school teacher. His unconventional methods inspire troubled students.\n\nThe anime mixes comedy with heartfelt life lessons, tackling social issues with humor and sincerity.\n\nGTO is cherished for its balance of laughs and inspiring messages about education and growth.",

Clannad: "Clannad tells the story of Tomoya, a delinquent who meets Nagisa, a frail girl with big dreams. The series explores love, family, and the struggles of growing up.\n\nThe anime’s sequel, Clannad: After Story, is especially known for its emotional depth and heartbreaking moments.\n\nClannad is regarded as one of the most moving romance and drama anime ever made.",

YourLieInApril: "Your Lie in April follows Kousei, a piano prodigy who loses his ability to hear the piano after his mother’s death. His life changes when he meets Kaori, a spirited violinist.\n\nThe anime explores themes of grief, healing, and the transformative power of music and love.\n\nWith beautiful animation and a touching story, Your Lie in April left audiences worldwide deeply moved.",

Anohana: "Anohana: The Flower We Saw That Day tells the story of childhood friends who drift apart after a tragedy. Years later, the ghost of their friend Menma brings them back together.\n\nThe anime explores guilt, friendship, and the process of healing from loss.\n\nAnohana is remembered for its emotional storytelling, leaving many viewers in tears.",

Toradora: "Toradora is a romantic comedy about Ryuuji, a kind boy with a scary face, and Taiga, a fierce but tiny girl. They form an unlikely alliance to help each other with their crushes.\n\nThe anime balances humor with heartfelt moments, capturing the struggles of teenage love.\n\nToradora is considered one of the best romance anime, cherished for its characters and satisfying conclusion.",

FruitsBasket: "Fruits Basket follows Tohru, a kind girl who becomes involved with the Sohma family, cursed to transform into zodiac animals when hugged by the opposite sex.\n\nThe anime deals with themes of kindness, trauma, and acceptance, blending comedy with drama.\n\nThe 2019 remake especially won praise for faithfully adapting the manga’s heartfelt story.",

KurokoNoBasket: "Kuroko’s Basketball tells the story of Kuroko, a seemingly invisible player, and Kagami, a talented newcomer. Together, they challenge the 'Generation of Miracles' in high school basketball.\n\nThe anime emphasizes teamwork, determination, and the love of the sport.\n\nKuroko’s Basketball gained popularity for its exciting matches and inspiring underdog narrative.",

Haikyuu: "Haikyuu follows Shoyo Hinata, a passionate volleyball player who dreams of becoming a star despite his short height. He joins Karasuno High’s team and learns the value of teamwork.\n\nThe anime highlights perseverance, bonds, and the emotional highs and lows of competition.\n\nHaikyuu became one of the most beloved sports anime, praised for its realism and motivation.",

SlamDunk: "Slam Dunk tells the story of Hanamichi Sakuragi, a delinquent who joins his high school basketball team to impress a girl. Despite his lack of experience, he grows into a true player.\n\nThe anime captures the excitement of basketball while exploring themes of teamwork and perseverance.\n\nSlam Dunk is considered a classic, credited with popularizing basketball in Japan.",

InitialD: "Initial D follows Takumi Fujiwara, a tofu delivery driver with unmatched drifting skills. He becomes a legend in the world of street racing.\n\nThe anime combines racing action with themes of passion, growth, and rivalry.\n\nInitial D is iconic for its Eurobeat soundtrack and influence on car culture worldwide.",

AkameGaKill: "Akame ga Kill follows Tatsumi, a young warrior who joins Night Raid, an assassin group fighting against a corrupt empire. The anime features intense battles and tragic sacrifices.\n\nThe series highlights the brutality of war and the cost of fighting for justice.\n\nAkame ga Kill gained fame for its shocking twists and willingness to kill off major characters.",

ElfenLied: "Elfen Lied tells the story of Lucy, a mutant with deadly powers who escapes captivity, leaving destruction in her path. Despite her violence, the anime explores her tragic past.\n\nThe series combines graphic violence with themes of discrimination, trauma, and humanity.\n\nElfen Lied is controversial but influential, remembered for its emotional weight and brutality.",

ReZero: "Re:Zero - Starting Life in Another World follows Subaru, who is transported to a fantasy world and discovers he can rewind time upon death. He struggles to protect those he cares about.\n\nThe anime explores suffering, resilience, and the psychological toll of endless failure.\n\nRe:Zero became a hit isekai series, admired for its unique concept and dark twists.",

Konosuba: "Konosuba is a comedy isekai about Kazuma, who dies and is sent to a fantasy world with a useless goddess, Aqua. Alongside eccentric companions, he faces absurd adventures.\n\nThe anime parodies RPG tropes with humor while still delivering heartwarming moments.\n\nKonosuba is beloved for its comedy, quirky characters, and lighthearted take on isekai.",

NoGameNoLife: "No Game No Life follows siblings Sora and Shiro, undefeated gamers transported to a world where games decide everything. They aim to challenge and overthrow the god of games.\n\nThe anime is filled with strategy, creativity, and vibrant visuals.\n\nNo Game No Life is celebrated for its clever battles and colorful art style.",

DrStone: "Dr. Stone tells the story of Senku, a genius who awakens in a world where humanity has turned to stone. Using science, he rebuilds civilization from scratch.\n\nThe anime blends adventure with educational elements, showcasing the power of human knowledge.\n\nDr. Stone is admired for its unique concept, humor, and inspiring message about science.",

ThePromisedNeverland: "The Promised Neverland follows children in an orphanage who discover they are being raised as food for monsters. Emma, Norman, and Ray devise an escape plan.\n\nThe anime balances suspense with themes of trust, survival, and sacrifice.\n\nThe first season is especially praised for its chilling story and gripping tension.",

BlueExorcist: "Blue Exorcist follows Rin Okumura, who learns he is the son of Satan. Determined to fight his fate, he trains as an exorcist to protect humanity.\n\nThe anime combines supernatural battles with themes of family, identity, and rebellion.\n\nBlue Exorcist became popular for its stylish action and emotional storytelling.",

SeraphOfTheEnd: "Seraph of the End is set in a post-apocalyptic world where vampires enslave humanity. Yuichiro, a survivor, joins the resistance to fight back.\n\nThe anime blends dark fantasy with emotional bonds, focusing on themes of revenge and hope.\n\nIts striking visuals and intense story earned it a dedicated fanbase.",

MadeInAbyss: "Made in Abyss follows Riko, a girl who ventures into a vast abyss filled with dangers, searching for her mother. She is joined by a mysterious robot boy named Reg.\n\nThe anime contrasts cute visuals with dark, emotional storytelling, exploring sacrifice and survival.\n\nMade in Abyss is acclaimed for its world-building and emotional depth, though it can be deeply unsettling.",

Noragami: "Noragami tells the story of Yato, a minor god who dreams of having millions of worshippers. With his regalia partner Yukine and a human girl named Hiyori, he takes odd jobs to gain followers.\n\nThe anime blends humor with heartfelt arcs about faith, identity, and belonging.\n\nNoragami became popular for its balance of comedy, action, and emotional storytelling.",
DeathNote: "Death Note, adapted from Tsugumi Ohba and Takeshi Obata’s manga, tells the story of Light Yagami, a genius who discovers a notebook that can kill anyone whose name is written in it. With it, he attempts to create a world free of crime.\n\nThe anime builds tension through the cat-and-mouse battle between Light and the brilliant detective L. Their psychological duel is a hallmark of anime suspense.\n\nDeath Note is one of the most famous adaptations, praised for its clever writing, moral dilemmas, and iconic characters.",

AttackOnTitan: "Attack on Titan, based on Hajime Isayama’s manga, is set in a world besieged by giant humanoid creatures called Titans. Humanity hides behind massive walls to survive.\n\nThe story follows Eren Yeager, Mikasa Ackerman, and Armin Arlert as they fight to reclaim freedom. Themes of war, survival, and the cycle of violence shape the narrative.\n\nAttack on Titan became a global phenomenon, blending action, mystery, and tragedy into one of the most influential anime adaptations of the 21st century.",

FullmetalAlchemist: "Fullmetal Alchemist, adapted from Hiromu Arakawa’s manga, tells the story of Edward and Alphonse Elric, two brothers who suffer tragic consequences after using forbidden alchemy.\n\nTheir journey to restore their bodies leads them into conflicts involving war, morality, and the cost of ambition. Brotherhood and sacrifice are central themes.\n\nThe Brotherhood adaptation is especially celebrated for faithfully adapting the manga, creating one of the most beloved anime ever made.",

Naruto: "Naruto, adapted from Masashi Kishimoto’s manga, follows Naruto Uzumaki, a spirited ninja ostracized for the demon fox sealed inside him. His dream is to become Hokage, the strongest ninja and leader of his village.\n\nThe anime balances intense battles with heartfelt friendships, exploring perseverance, loneliness, and redemption.\n\nNaruto grew into one of the most influential shonen anime, paving the way for a global wave of manga-inspired adaptations.",

Bleach: "Bleach, based on Tite Kubo’s manga, tells the story of Ichigo Kurosaki, a teenager who becomes a Soul Reaper tasked with protecting souls and defeating evil spirits known as Hollows.\n\nThe series mixes action, stylish designs, and supernatural themes. Its battles against powerful enemies highlight Ichigo’s growth.\n\nBleach was a pillar of shonen anime alongside Naruto and One Piece, leaving a major impact on anime culture worldwide.",

OnePiece: "One Piece, adapted from Eiichiro Oda’s manga, follows Monkey D. Luffy and his crew as they sail across dangerous seas in search of the legendary treasure, the One Piece.\n\nThe anime is an adventure filled with friendship, freedom, and resilience. Its colorful world, emotional arcs, and endless creativity make it unique.\n\nOne Piece is the longest-running and most successful manga adaptation, beloved across generations for its charm and depth.",

HunterXHunter: "Hunter x Hunter, adapted from Yoshihiro Togashi’s manga, follows Gon Freecss, a boy who aspires to become a Hunter and find his missing father. His journey introduces him to friends and dangerous challenges.\n\nThe anime balances adventure, strategy, and emotional arcs with dark undertones. Each arc offers unique conflicts and moral dilemmas.\n\nHunter x Hunter is hailed as one of the most intelligent shonen adaptations, blending action with psychological storytelling.",

DragonBall: "Dragon Ball, based on Akira Toriyama’s manga, follows Son Goku from childhood adventures to epic martial arts battles. Its sequel, Dragon Ball Z, expands into larger-than-life conflicts.\n\nThemes of perseverance, friendship, and fighting spirit define the series. Iconic battles like Goku vs. Frieza set the standard for shonen anime.\n\nDragon Ball became a global phenomenon, introducing anime to mainstream audiences and influencing countless future adaptations.",

JoJosBizarreAdventure: "JoJo’s Bizarre Adventure, adapted from Hirohiko Araki’s manga, is a multigenerational saga following the Joestar family and their battles against supernatural enemies.\n\nEach part introduces new characters, powers, and unique storytelling styles. From vampiric horror to flamboyant Stand battles, it reinvents itself constantly.\n\nJoJo became a cult favorite and cultural icon, known for its creativity, eccentricity, and stylish adaptation of Araki’s legendary manga.",

MyHeroAcademia: "My Hero Academia, adapted from Kohei Horikoshi’s manga, is set in a world where most people have superpowers known as Quirks. It follows Izuku Midoriya, a boy born powerless who inherits the ability of the greatest hero.\n\nThe anime explores themes of courage, legacy, and what it means to be a hero. Its mix of action and heartfelt struggles made it a new-generation shonen hit.\n\nMy Hero Academia’s faithful adaptation has won fans worldwide, influencing modern anime culture.",

YuYuHakusho: "Yu Yu Hakusho, adapted from Yoshihiro Togashi’s manga, follows Yusuke Urameshi, a delinquent who dies saving a child but is resurrected as a Spirit Detective.\n\nThe anime blends supernatural battles with heartfelt character development. Each arc grows in intensity, exploring teamwork and personal growth.\n\nYu Yu Hakusho is considered a classic, laying the foundation for many battle shonen that followed.",

RurouniKenshin: "Rurouni Kenshin, based on Nobuhiro Watsuki’s manga, follows Himura Kenshin, a wandering swordsman who vows never to kill again after his bloody past as an assassin.\n\nThe anime balances action with themes of redemption, peace, and forgiveness. Kenshin’s gentle heart contrasts with his violent skills.\n\nRurouni Kenshin became one of the most iconic samurai anime, admired for its character depth and historical flavor.",

Inuyasha: "Inuyasha, adapted from Rumiko Takahashi’s manga, tells the story of Kagome, a modern girl who falls into Japan’s feudal era, where she meets Inuyasha, a half-demon searching for the Sacred Jewel.\n\nTheir adventure mixes romance, fantasy, and battles against demons. Themes of love, betrayal, and destiny run strong.\n\nInuyasha became a worldwide hit, blending folklore with accessible storytelling for anime fans of all ages.",

DGrayMan: "D.Gray-man, based on Katsura Hoshino’s manga, follows Allen Walker, an exorcist fighting against cursed beings known as Akuma created by the sinister Millennium Earl.\n\nThe series combines gothic aesthetics with emotional storytelling, exploring sacrifice and the burden of destiny.\n\nThough its anime adaptations were sometimes incomplete, D.Gray-man remains beloved for its dark, emotional depth.",

SoulEater: "Soul Eater, adapted from Atsushi Ohkubo’s manga, takes place in the Death Weapon Meister Academy, where students train to battle evil souls. Meisters partner with living weapons that transform into human form.\n\nThe anime combines action, gothic style, and quirky humor. Its characters explore friendship and courage while battling deadly foes.\n\nSoul Eater became iconic for its unique style and thrilling battles, cementing its place as a beloved shonen adaptation.",

FairyTail: "Fairy Tail, based on Hiro Mashima’s manga, tells the story of Natsu Dragneel, Lucy Heartfilia, and their guild of powerful wizards.\n\nThe anime thrives on camaraderie, over-the-top battles, and emotional bonds among guild members. Themes of friendship and perseverance dominate.\n\nFairy Tail was a global hit, offering heartfelt adventures and spectacular battles for fans of shonen anime.",

AkameGaKill: "Akame ga Kill!, adapted from Takahiro and Tetsuya Tashiro’s manga, follows Tatsumi, a young fighter who joins an assassin group fighting against a corrupt empire.\n\nThe anime mixes action with tragedy, as characters face brutal fates. It explores rebellion, sacrifice, and the price of revolution.\n\nAkame ga Kill! is remembered for its shocking twists and emotional impact, despite diverging from the manga’s original ending.",

ThePromisedNeverland: "The Promised Neverland, based on Kaiu Shirai and Posuka Demizu’s manga, follows children raised in an orphanage who discover a horrifying secret and plan their escape.\n\nThe series is filled with suspense, strategy, and emotional stakes as the kids fight for survival against impossible odds.\n\nIts first season was widely praised as a masterful adaptation, though later seasons diverged, leaving fans divided.",

Nana: "Nana, adapted from Ai Yazawa’s manga, follows two women named Nana whose lives intertwine as they pursue love and ambition in Tokyo.\n\nThe anime mixes romance, music, and drama, exploring relationships, heartbreak, and dreams. Its realistic portrayal of young adulthood set it apart.\n\nNana remains one of the most powerful shojo adaptations, deeply resonating with audiences for its emotional authenticity.",

KurokoNoBasket: "Kuroko no Basket, adapted from Tadatoshi Fujimaki’s manga, follows a high school basketball team striving for victory. Among them is Kuroko, a player who uses misdirection rather than strength.\n\nThe anime combines sports action with themes of teamwork, rivalry, and determination. Each game becomes a test of spirit and skill.\n\nKuroko no Basket became a massive sports anime hit, celebrated for its energy and passion.",

Toriko: "Toriko, based on Mitsutoshi Shimabukuro’s manga, follows Toriko, a Gourmet Hunter searching for the rarest ingredients in a fantastical world.\n\nThe anime is filled with action, comedy, and bizarre yet creative battles against monstrous creatures.\n\nThough it didn’t reach the same popularity as other shonen giants, Toriko remains a fun and unique adaptation for food and adventure fans.",

AstroBoy: "Astro Boy, adapted from Osamu Tezuka’s pioneering manga, tells the story of a robot boy created to replace a scientist’s lost son. Gifted with incredible powers, he fights for justice.\n\nThe series is both a superhero tale and a philosophical exploration of humanity and technology.\n\nAstro Boy is regarded as the grandfather of manga adaptations, influencing decades of anime storytelling.",

Hellsing: "Hellsing, based on Kouta Hirano’s manga, follows the vampire Alucard, who works for the Hellsing Organization to fight supernatural threats in England.\n\nThe anime is filled with gothic horror, action, and dark humor. Themes of power and monstrosity dominate.\n\nHellsing Ultimate, the faithful OVA adaptation, became iconic for its stylish violence and loyal manga adaptation.",

Trigun: "Trigun, based on Yasuhiro Nightow’s manga, follows Vash the Stampede, a gunslinger with a huge bounty on his head but a heart of gold.\n\nThe series blends Western themes, comedy, and tragedy as Vash struggles to uphold his pacifist ideals.\n\nTrigun became a cult classic, admired for its character depth and philosophical storytelling.",

SlamDunk: "Slam Dunk, adapted from Takehiko Inoue’s manga, follows Hanamichi Sakuragi, a delinquent who joins his high school basketball team to impress a girl.\n\nThe anime combines humor with sports drama, capturing the excitement of youth and determination.\n\nSlam Dunk became one of Japan’s most influential sports anime, inspiring generations of basketball fans.",

Beelzebub: "Beelzebub, based on Ryuhei Tamura’s manga, tells the comedic story of delinquent Oga Tatsumi, who ends up raising the baby son of a demon lord.\n\nThe anime mixes over-the-top action with absurd humor. Themes of unlikely responsibility and chaos dominate.\n\nThough short-lived, Beelzebub became a fan-favorite for its wild energy and comedy.",

ShamanKing: "Shaman King, adapted from Hiroyuki Takei’s manga, follows Yoh Asakura, a boy who can communicate with spirits and competes in the Shaman Fight to become the Shaman King.\n\nThe anime blends supernatural action with themes of peace and understanding. Yoh’s laid-back attitude contrasts with intense battles.\n\nThe 2021 reboot gave fans a faithful adaptation, bringing new life to a beloved classic.",

KatekyoHitmanReborn: "Katekyo Hitman Reborn!, based on Akira Amano’s manga, tells the story of Tsuna, a timid boy who discovers he is heir to a mafia family. With help from the baby hitman Reborn, he grows into a leader.\n\nThe anime combines comedy, supernatural battles, and mafia drama. Tsuna’s growth is at the heart of the series.\n\nReborn! became a popular long-running shonen adaptation, though it never received a full conclusion.",

Gintama: "Gintama, adapted from Hideaki Sorachi’s manga, is set in an alternate Edo period where aliens rule Japan. It follows Gintoki Sakata, a lazy samurai who takes odd jobs.\n\nThe anime mixes absurd comedy with emotional, action-packed arcs. Its ability to switch between parody and seriousness made it stand out.\n\nGintama is considered one of the funniest and most versatile manga adaptations ever made.",

YuGiOh: "Yu-Gi-Oh!, adapted from Kazuki Takahashi’s manga, follows Yugi Mutou, who unleashes the spirit of an ancient Pharaoh through a mystical puzzle. Together, they duel opponents in games of strategy.\n\nThe anime focuses on friendship, rivalry, and the thrill of battles. Its trading card game tie-in became a worldwide phenomenon.\n\nYu-Gi-Oh! became a pop culture icon, spawning numerous spinoffs and global fandom.",

SkipBeat: "Skip Beat!, based on Yoshiki Nakamura’s manga, follows Kyoko Mogami, a girl betrayed by her childhood crush who seeks revenge by entering the entertainment industry.\n\nThe anime blends comedy and drama, exploring themes of self-worth, ambition, and healing.\n\nSkip Beat! remains beloved for its strong heroine and witty storytelling, though fans still hope for a second season.",

DragonQuest: "Dragon Quest: The Adventure of Dai, adapted from Riku Sanjo’s manga, follows Dai, a young boy with heroic aspirations in a world filled with monsters and magic.\n\nThe anime mixes classic RPG-style adventures with emotional storytelling, drawing from the popular game franchise.\n\nIts 2020 reboot brought renewed attention, offering a faithful and modern adaptation of the original story.",

RosarioVampire: "Rosario + Vampire, based on Akihisa Ikeda’s manga, tells the story of Tsukune Aono, a human boy who unknowingly enrolls in a school for monsters and falls for the vampire Moka.\n\nThe anime mixes comedy, romance, and supernatural battles. It focuses on acceptance and hidden identities.\n\nThough lighter than its manga counterpart, Rosario + Vampire gained fans for its fun premise.",

BoysOverFlowers: "Boys Over Flowers (Hana Yori Dango), adapted from Yoko Kamio’s manga, follows Tsukushi Makino, a working-class girl who clashes with the wealthy and arrogant F4 at her elite school.\n\nThe anime blends romance, drama, and social commentary. Its Cinderella-style story captivated audiences.\n\nBoys Over Flowers became one of the most famous shojo adaptations, inspiring dramas across Asia.",

Chobits: "Chobits, adapted from CLAMP’s manga, follows Hideki, a student who discovers Chi, an abandoned humanoid robot known as a Persocom.\n\nThe anime explores love, technology, and the meaning of humanity. Chi’s innocence raises deep questions about connection.\n\nChobits became a beloved adaptation for its unique mix of romance and science fiction.",

CardCaptorSakura: "Cardcaptor Sakura, adapted from CLAMP’s manga, follows Sakura Kinomoto, a girl who discovers magical cards and must collect them while balancing school and friendships.\n\nThe anime blends magical girl themes with heartwarming coming-of-age stories. Its focus on love and courage made it iconic.\n\nCardcaptor Sakura remains one of the most beloved shojo anime worldwide.",

RanmaHalf: "Ranma ½, based on Rumiko Takahashi’s manga, tells the comedic tale of Ranma Saotome, a martial artist cursed to turn into a girl when splashed with cold water.\n\nThe anime mixes martial arts battles with slapstick comedy and romance. Its bizarre premise created endless hijinks.\n\nRanma ½ became a fan favorite for its humor and unique concept, influencing many romantic comedies that followed.",

HikaruNoGo: "Hikaru no Go, adapted from Yumi Hotta and Takeshi Obata’s manga, follows Hikaru, a boy who discovers a Go board haunted by the spirit of an ancient player.\n\nThe anime turns the traditional board game into an epic coming-of-age journey. Themes of passion and growth shine.\n\nHikaru no Go is praised as one of the best sports/strategy adaptations, introducing many fans to the game of Go.",

OutlawStar: "Outlaw Star, based on Takehiko Ito’s manga, follows Gene Starwind and his crew as they travel through space in search of treasure and adventure.\n\nThe anime blends space opera, action, and comedy with themes of freedom and camaraderie.\n\nOutlaw Star became a cult hit, remembered for its unique mix of genres and nostalgic appeal.",

OranHighSchoolHostClub: "Ouran High School Host Club, adapted from Bisco Hatori’s manga, follows Haruhi Fujioka, a student who disguises herself as a boy to repay a debt to her school’s host club.\n\nThe anime blends comedy, romance, and parody of shojo tropes. Its witty humor and charming characters won fans instantly.\n\nOuran remains a fan-favorite adaptation, loved for its humor and heartfelt moments.",

Bakuman: "Bakuman, based on Tsugumi Ohba and Takeshi Obata’s manga, follows two teens who dream of becoming successful manga creators. It portrays the struggles of the manga industry itself.\n\nThe anime blends ambition, romance, and creativity, showing the challenges of chasing dreams.\n\nBakuman is praised for its realistic and inspiring look at the world of manga, making it a unique adaptation.",
SavingPrivateRyan: "Saving Private Ryan (1998), directed by Steven Spielberg, follows a group of U.S. soldiers during World War II who are tasked with finding and bringing home Private James Ryan after his brothers are killed in combat.\n\nThe film explores themes of sacrifice, duty, and the human cost of war. Its opening D-Day sequence is regarded as one of the most realistic depictions of battle ever put on screen.\n\nWidely considered a masterpiece, Saving Private Ryan redefined the war movie genre and influenced countless films that followed.",

ApocalypseNow: "Apocalypse Now (1979), directed by Francis Ford Coppola, is set during the Vietnam War. It follows Captain Willard as he is sent on a mission to assassinate Colonel Kurtz, a decorated officer who has gone rogue.\n\nThe film delves into the psychological horrors of war, blurring the line between sanity and madness. Its surreal imagery and philosophical tone set it apart from traditional war narratives.\n\nApocalypse Now is hailed as one of the greatest films ever made, a haunting meditation on the darkness within humanity.",

FullMetalJacket: "Full Metal Jacket (1987), directed by Stanley Kubrick, presents a raw look at the Vietnam War through the eyes of a group of U.S. Marines. The film is divided into two parts: brutal boot camp training and the chaos of combat.\n\nThemes of dehumanization, identity, and the psychological toll of war dominate the story. The infamous drill instructor scenes showcase Kubrick’s ability to reveal cruelty masked as discipline.\n\nToday, Full Metal Jacket stands as a defining anti-war film, with unforgettable performances and sharp social commentary.",

Platoon: "Platoon (1986), directed by Oliver Stone, portrays the Vietnam War from the perspective of a young soldier, Chris Taylor. It focuses on the moral conflicts within his platoon, torn between two sergeants with opposing philosophies.\n\nThe film emphasizes the chaos, fear, and conflicting loyalties soldiers faced in Vietnam. Its gritty realism set it apart from earlier, more romanticized war films.\n\nPlatoon won four Academy Awards, including Best Picture, and remains a landmark in depicting the Vietnam War’s human cost.",

Dunkirk: "Dunkirk (2017), directed by Christopher Nolan, tells the story of the evacuation of Allied troops from Dunkirk, France, during World War II. The film uses three perspectives—land, sea, and air—to create a nonlinear, tense experience.\n\nDialogue is minimal, with visuals and sound driving the narrative. Themes of survival, duty, and collective sacrifice dominate the story.\n\nDunkirk was praised for its technical brilliance and immersive storytelling, cementing its place as one of the most innovative war films of the 21st century.",

HacksawRidge: "Hacksaw Ridge (2016), directed by Mel Gibson, is based on the true story of Desmond Doss, a pacifist combat medic who refused to carry a weapon but saved 75 men during the Battle of Okinawa.\n\nThe film highlights Doss’s faith, courage, and determination, contrasting the brutality of war with the strength of conviction. His resilience in the face of doubt inspires his fellow soldiers.\n\nHacksaw Ridge earned critical acclaim and multiple awards, reminding audiences of the extraordinary heroism found in nonviolence.",

1917: "1917 (2019), directed by Sam Mendes, is set during World War I and follows two young British soldiers tasked with delivering a crucial message to prevent a deadly ambush.\n\nThe film is renowned for its one-shot technique, immersing viewers in the soldiers’ harrowing journey across enemy lines. Themes of brotherhood, duty, and survival dominate the narrative.\n\n1917 received widespread acclaim for its technical achievements and emotional depth, becoming a modern war classic.",

LettersFromIwoJima: "Letters from Iwo Jima (2006), directed by Clint Eastwood, tells the story of the Battle of Iwo Jima from the Japanese perspective. It follows General Kuribayashi and his soldiers as they defend their island against American forces.\n\nThe film humanizes the Japanese side, focusing on honor, sacrifice, and the futility of war. Its narrative challenges stereotypes by showing the shared humanity of soldiers on both sides.\n\nThe film received critical acclaim worldwide and is considered one of the best World War II films ever made.",

BlackHawkDown: "Black Hawk Down (2001), directed by Ridley Scott, dramatizes the 1993 Battle of Mogadishu, where U.S. soldiers faced a prolonged fight after a mission went wrong.\n\nThe movie emphasizes the chaos of modern warfare, with soldiers trapped in a hostile city while trying to survive. It showcases themes of camaraderie, sacrifice, and the harsh realities of combat.\n\nBlack Hawk Down is remembered for its intense realism and has become a benchmark for modern military action films.",

TheThinRedLine: "The Thin Red Line (1998), directed by Terrence Malick, depicts the Battle of Guadalcanal during World War II. It focuses on the inner lives of soldiers and their relationship with nature amid the chaos of battle.\n\nUnlike traditional war films, it emphasizes philosophy and emotion over action. Soldiers are portrayed as fragile human beings caught in the machinery of war.\n\nThe Thin Red Line is regarded as a poetic masterpiece, offering a meditative alternative to the conventional war epic.",
EnemyAtTheGates: "Enemy at the Gates (2001), directed by Jean-Jacques Annaud, is set during the Battle of Stalingrad in World War II. It tells the story of a duel between a Soviet sniper, Vasily Zaitsev, and a German marksman sent to eliminate him.\n\nThe film combines suspense, romance, and historical drama while showcasing the desperation of one of the war’s bloodiest battles. It illustrates how individual heroism can inspire an entire nation.\n\nEnemy at the Gates is known for its tense atmosphere and portrayal of urban warfare under extreme conditions.",

ThePianist: "The Pianist (2002), directed by Roman Polanski, tells the true story of Władysław Szpilman, a Jewish pianist who survives the Holocaust in Warsaw.\n\nThe film emphasizes the brutality of the Nazi occupation, but also the resilience of the human spirit. Szpilman’s music becomes both his refuge and his means of survival in a collapsing world.\n\nThe Pianist won multiple Academy Awards and remains one of the most powerful depictions of personal survival in wartime.",

SchindlersList: "Schindler’s List (1993), directed by Steven Spielberg, chronicles the efforts of Oskar Schindler, a German industrialist who saved over a thousand Jews during the Holocaust.\n\nShot in stark black and white, the film underscores the horrors of genocide while highlighting the capacity for compassion amid evil. It remains one of cinema’s most harrowing yet hopeful works.\n\nSchindler’s List is widely considered one of the greatest films ever made, a timeless reminder of moral courage in times of atrocity.",

WeWereSoldiers: "We Were Soldiers (2002), directed by Randall Wallace, depicts the Battle of Ia Drang in Vietnam, where American troops faced overwhelming odds.\n\nThe film focuses on Colonel Hal Moore’s leadership and the bravery of soldiers under fire. It also emphasizes the impact of war on families waiting at home.\n\nWe Were Soldiers combines action with emotional resonance, paying tribute to the sacrifices made by soldiers and their loved ones.",

TheBridgeOnTheRiverKwai: "The Bridge on the River Kwai (1957), directed by David Lean, tells the story of British POWs forced by the Japanese to build a bridge in Burma during World War II.\n\nThe film explores themes of pride, duty, and the futility of war. Its climax delivers a powerful critique of obsession and the destructive cycle of conflict.\n\nWinner of seven Academy Awards, The Bridge on the River Kwai remains a classic in war cinema history.",

Patton: "Patton (1970), directed by Franklin J. Schaffner, is a biographical war film about General George S. Patton, one of the most controversial figures of World War II.\n\nThe film portrays his brilliance as a strategist, his volatile personality, and his clashes with fellow commanders. It shows the thin line between genius and recklessness in wartime leadership.\n\nPatton won seven Academy Awards, including Best Picture, and remains one of the definitive portrayals of military leadership.",

Glory: "Glory (1989), directed by Edward Zwick, tells the story of the 54th Massachusetts Infantry Regiment, one of the first African-American units in the U.S. Civil War.\n\nThe film highlights the courage and struggles of Black soldiers fighting for freedom and equality, even while facing discrimination within the Union Army.\n\nGlory is celebrated for its performances, historical significance, and emotional impact, shining a light on an overlooked chapter of American history.",

TheDeerHunter: "The Deer Hunter (1978), directed by Michael Cimino, follows a group of friends from a small American town before, during, and after their harrowing experiences in the Vietnam War.\n\nIt explores the psychological trauma inflicted by war and the bonds of friendship that struggle to survive under immense pressure.\n\nThe Deer Hunter won five Academy Awards, including Best Picture, and remains a haunting meditation on the long-term effects of combat.",

ABridgeTooFar: "A Bridge Too Far (1977), directed by Richard Attenborough, dramatizes Operation Market Garden, a failed Allied campaign in World War II to capture key bridges in the Netherlands.\n\nThe film features an all-star cast and examines the overconfidence and miscommunication that led to disaster.\n\nA Bridge Too Far is remembered for its epic scale and its unflinching look at military miscalculation.",

Midway: "Midway (2019), directed by Roland Emmerich, recounts the Battle of Midway, a turning point in the Pacific Theater of World War II.\n\nThe film emphasizes the bravery of pilots, intelligence officers, and sailors who shifted the balance of power against Japan.\n\nThough a modern blockbuster, Midway pays tribute to real-life heroism and sacrifice, blending action with historical respect.",

ToraToraTora: "Tora! Tora! Tora! (1970), directed by Richard Fleischer and Kinji Fukasaku, depicts the events leading up to the Japanese attack on Pearl Harbor.\n\nThe film presents both the American and Japanese perspectives, offering a balanced view of the strategies and miscalculations involved.\n\nIt is praised for its historical accuracy and remains a key depiction of the Pearl Harbor attack in cinema.",

PearlHarbor: "Pearl Harbor (2001), directed by Michael Bay, is a fictionalized account of the 1941 Japanese attack, blending romance with history.\n\nThough criticized for historical liberties, the film captures the scale of destruction and the human cost of the surprise assault.\n\nIt remains popular as a modern epic, with a strong focus on love, sacrifice, and patriotism during wartime.",

Gallipoli: "Gallipoli (1981), directed by Peter Weir, focuses on two young Australian men who enlist in World War I and are sent to fight in the disastrous Gallipoli campaign.\n\nThe film emphasizes camaraderie, innocence lost, and the futility of poorly led campaigns.\n\nGallipoli is regarded as one of Australia’s greatest films, blending national identity with universal themes of sacrifice.",

TheHurtLocker: "The Hurt Locker (2008), directed by Kathryn Bigelow, follows a bomb disposal team in the Iraq War as they confront life-or-death situations daily.\n\nIt explores addiction to adrenaline, the psychological toll of war, and the blurred lines between bravery and recklessness.\n\nThe Hurt Locker won six Academy Awards, including Best Picture, making Bigelow the first woman to win Best Director.",

AmericanSniper: "American Sniper (2014), directed by Clint Eastwood, tells the true story of Chris Kyle, a U.S. Navy SEAL sniper with the most confirmed kills in American military history.\n\nThe film examines his skill, struggles with PTSD, and the impact of his service on his family.\n\nAmerican Sniper became a box office hit and sparked debate about the morality and costs of modern warfare.",

LoneSurvivor: "Lone Survivor (2013), directed by Peter Berg, is based on the true story of Operation Red Wings, where a group of Navy SEALs were ambushed in Afghanistan.\n\nThe film emphasizes brotherhood, sacrifice, and resilience against overwhelming odds.\n\nLone Survivor is a modern war film that highlights the brutal realities of combat and the courage of those who endure it.",

ZeroDarkThirty: "Zero Dark Thirty (2012), directed by Kathryn Bigelow, dramatizes the decade-long hunt for Osama bin Laden, culminating in the 2011 Navy SEAL raid.\n\nIt focuses on the relentless work of intelligence officers, particularly Maya, whose determination drove the mission forward.\n\nThe film sparked controversy but earned acclaim for its suspenseful storytelling and portrayal of modern counterterrorism.",

Jarhead: "Jarhead (2005), directed by Sam Mendes, is based on the memoir of Anthony Swofford, a U.S. Marine sniper during the Gulf War.\n\nThe film explores boredom, frustration, and the psychological effects of waiting for combat that never comes.\n\nJarhead is unique among war films for its focus on the monotony and emotional toll of military life rather than large-scale battles.",

Defiance: "Defiance (2008), directed by Edward Zwick, tells the true story of Jewish brothers who led a resistance movement against Nazi forces in Belarus during World War II.\n\nThe film emphasizes survival, leadership, and the fight to preserve community under persecution.\n\nDefiance highlights a lesser-known but inspiring story of resilience and resistance during the Holocaust.",

ComeAndSee: "Come and See (1985), directed by Elem Klimov, is a Soviet war film set during the Nazi occupation of Belarus.\n\nIt follows a young boy who joins the resistance, only to witness unimaginable atrocities. The film is unrelentingly raw and harrowing.\n\nCome and See is widely considered one of the most powerful anti-war films ever made, unforgettable for its emotional intensity and stark realism.",
ApocalypseNow: "Apocalypse Now (1979), directed by Francis Ford Coppola, follows Captain Benjamin Willard on a mission during the Vietnam War to find and assassinate Colonel Kurtz, a rogue officer who has gone mad.\n\nThe film explores the psychological effects of war, the brutality of combat, and the thin line between sanity and madness. It is filled with surreal and haunting imagery.\n\nApocalypse Now is considered one of the greatest films ever made, offering a nightmarish portrait of Vietnam and the darkness of human nature.",

FullMetalJacket: "Full Metal Jacket (1987), directed by Stanley Kubrick, is divided into two parts: the harsh training of new Marine recruits and their experiences during the Vietnam War.\n\nIt portrays the dehumanizing process of military indoctrination, focusing on characters like Joker, Pyle, and their drill instructor, Gunnery Sergeant Hartman.\n\nThe film is iconic for its raw depiction of training and combat, showing the psychological cost of war and Kubrick’s sharp, unflinching style.",

Platoon: "Platoon (1986), directed by Oliver Stone, is based on Stone’s own experiences in Vietnam. It follows Chris Taylor, a young soldier caught between two sergeants with opposing views.\n\nThe movie highlights the chaos, moral conflict, and human toll of the Vietnam War, depicting soldiers’ struggles with fear, morality, and survival.\n\nPlatoon won the Academy Award for Best Picture and is praised for its realistic and personal portrayal of combat in Vietnam.",

BlackHawkDown: "Black Hawk Down (2001), directed by Ridley Scott, depicts the Battle of Mogadishu, where U.S. soldiers faced intense urban combat in Somalia.\n\nThe movie showcases the bravery and struggles of American troops trapped in hostile territory, emphasizing camaraderie and the chaos of modern warfare.\n\nIt remains a gripping war drama known for its realism, technical excellence, and raw portrayal of survival under fire.",

1917: "1917 (2019), directed by Sam Mendes, follows two young British soldiers tasked with delivering a message to save hundreds of men during World War I.\n\nThe film is shot to look like one continuous take, immersing the audience in the urgency and danger of the mission. It highlights themes of sacrifice and determination.\n\n1917 was acclaimed for its technical innovation and emotional power, winning multiple Academy Awards and redefining the cinematic experience of war.",

LettersFromIwoJima: "Letters from Iwo Jima (2006), directed by Clint Eastwood, tells the story of the Battle of Iwo Jima from the Japanese perspective.\n\nThrough letters, the soldiers’ humanity, fears, and struggles are revealed, focusing on General Kuribayashi and his men.\n\nThe film is praised for its emotional depth, unique perspective, and powerful reminder that soldiers on both sides of war share common humanity.",

TheDeerHunter: "The Deer Hunter (1978), directed by Michael Cimino, examines the lives of a group of friends before, during, and after the Vietnam War.\n\nThe film is renowned for its harrowing Russian roulette scenes and its exploration of trauma, friendship, and the devastating impact of war on small-town America.\n\nIt won five Academy Awards, including Best Picture, and remains one of the most haunting portrayals of Vietnam’s psychological toll.",

TheThinRedLine: "The Thin Red Line (1998), directed by Terrence Malick, portrays the Battle of Guadalcanal during World War II.\n\nThe film combines stunning visuals with philosophical reflections, exploring the inner thoughts of soldiers facing chaos and mortality.\n\nThough overshadowed by Saving Private Ryan in the same year, it is now regarded as a masterpiece of poetic war cinema.",

EnemyAtTheGates: "Enemy at the Gates (2001) tells the story of the Battle of Stalingrad through the duel between Soviet sniper Vasily Zaitsev and German sniper Major König.\n\nIt highlights the brutality of urban warfare and the psychological duel between two skilled marksmen.\n\nThe film is praised for its tense sniper sequences and portrayal of the human cost of the Eastern Front.",

Patton: "Patton (1970) is a biographical film about U.S. General George S. Patton, focusing on his controversial leadership during World War II.\n\nThe film showcases Patton’s brilliance as a commander but also his flaws, temper, and larger-than-life personality.\n\nIt won seven Academy Awards, including Best Picture, and George C. Scott’s performance as Patton is considered legendary.",

ToraToraTora: "Tora! Tora! Tora! (1970) recounts the attack on Pearl Harbor from both American and Japanese perspectives.\n\nThe film balances historical accuracy with dramatic storytelling, showing the planning and execution of the surprise attack.\n\nIt is notable for its large-scale battle sequences and attention to detail, becoming a staple of war film history.",

TheBridgeOnTheRiverKwai: "The Bridge on the River Kwai (1957), directed by David Lean, tells the story of British POWs forced to build a railway bridge for the Japanese in Burma.\n\nColonel Nicholson’s obsession with completing the bridge clashes with the Allied mission to destroy it, raising questions about pride and duty.\n\nThe film won seven Academy Awards and remains one of the greatest war epics ever made.",

HacksawRidge: "Hacksaw Ridge (2016), directed by Mel Gibson, tells the true story of Desmond Doss, a conscientious objector who served as a medic during World War II without carrying a weapon.\n\nThe film depicts his courage in saving dozens of lives during the Battle of Okinawa, despite ridicule from fellow soldiers.\n\nIt was critically acclaimed and celebrated for highlighting faith, conviction, and heroism in war.",

Dunkirk: "Dunkirk (2017), directed by Christopher Nolan, recounts the evacuation of Allied troops from Dunkirk, France, during World War II.\n\nThe film uses three timelines—land, sea, and air—to capture the intensity of the event, with minimal dialogue and maximum tension.\n\nDunkirk was praised for its realism, sound design, and immersive storytelling, winning three Academy Awards.",

PathsOfGlory: "Paths of Glory (1957), directed by Stanley Kubrick, focuses on a French World War I officer defending three soldiers accused of cowardice.\n\nThe film critiques military hierarchy, injustice, and the futility of war, standing as one of Kubrick’s finest works.\n\nIt is regarded as a classic anti-war film with enduring influence.",

FlagsOfOurFathers: "Flags of Our Fathers (2006), directed by Clint Eastwood, tells the story of the men who raised the flag on Iwo Jima.\n\nIt examines the difference between the reality of war and the image of heroism portrayed back home in America.\n\nThe film is powerful in its reflection on memory, sacrifice, and the cost of national symbols.",

WeWereSoldiers: "We Were Soldiers (2002), starring Mel Gibson, depicts the Battle of Ia Drang, one of the first major battles of the Vietnam War.\n\nThe film focuses on Lt. Col. Hal Moore and his troops, highlighting brotherhood, courage, and loss.\n\nIt is praised for its authenticity and emotional storytelling, honoring the soldiers who fought.",

ThePianist: "The Pianist (2002), directed by Roman Polanski, tells the true story of Władysław Szpilman, a Polish-Jewish pianist who survived the Holocaust.\n\nThe film portrays his struggles to endure in Nazi-occupied Warsaw and the impact of war on civilians.\n\nIt won three Academy Awards, including Best Director and Best Actor, and is regarded as one of the most powerful Holocaust films ever made.",

ComeAndSee: "Come and See (1985), directed by Elem Klimov, is a Soviet film about a young boy experiencing the horrors of the Nazi occupation in Belarus.\n\nThe movie is known for its unflinching, surreal, and haunting imagery that captures the trauma of war through a child’s eyes.\n\nIt is considered one of the most devastating and unforgettable anti-war films ever made.",

Downfall: "Downfall (2004) depicts the final days of Adolf Hitler in his Berlin bunker as the Third Reich collapses.\n\nThe film shows the desperation, fanaticism, and suffering of those trapped in the Nazi regime’s downfall.\n\nIt is acclaimed for its historical accuracy and Bruno Ganz’s chilling performance as Hitler.",

LeonorWillNeverDie: "Leonor Will Never Die (2022) – A psychological comedy-drama by Martika Ramirez Escobar about a retired screenwriter who, after a coma, finds herself inside her unfinished screenplay.\n\nSheila Francisco stars as Leonor, whose real life and narrative life blur, giving the film a meta story about creation, regrets, and the magic of storytelling. The tone shifts between surreal, playful, and poignant moments as Leonor confronts parts of her past she never resolved.\n\nIt premiered at Sundance and became known for its originality, humor, and homage to classic Filipino action films, gaining critical acclaim for its inventiveness and emotional core." ,

Balota: "Balota (2024) – A political thriller directed by Kip Oebanda, following Emmy, a teacher who becomes embroiled in election-day violence during a volatile local election.\n\nWhen violence erupts, Emmy must flee into the forest with a ballot box containing critical election results. The film explores power, democracy, and the cost of doing what’s right in a corrupt system.\n\nBalota premiered at Cinemalaya and was noted for its tense pacing, strong performance by Marian Rivera, and its timely commentary on political integrity and community resilience." ,

GoyoAngBatangHeneral: "Goyo: Ang Batang Heneral (2018) – A historical biopic focused on the life of Gregorio ‘Goyo’ del Pilar during the Philippine–American War.\n\nPlayed by Paulo Avelino, Goyo navigates duties, pride, and the expectations of heroism in war. The film delves into the burden of legacy, youth in leadership, and the cost of ambition amidst upheaval.\n\nVisually striking, the film is renowned for its cinematography, powerful performances, and its exploration of how ideals and reality collide in wartime." ,

HeneralLuna: "Heneral Luna (2015) – A historical war film by Jerrold Tarog that portrays Antonio Luna’s fierce resistance against colonizers and the internal conflicts of the Philippine revolutionary leadership.\n\nJohn Arcilla delivers a chilling performance as Luna, embodying both brilliance and ruthlessness, fighting not only external enemies but also the apathy and treachery within his own ranks. The film dramatizes battles with great detail and realism.\n\nIt has become a modern classic of Philippine cinema, praised for its storytelling, direction, and its unflinching portrayal of leadership, nationalism, and betrayal." ,

OneMoreChance: "One More Chance (2007) – Romantic drama directed by Cathy Garcia-Molina about love, heartbreak, and the second chances we crave.\n\nJohn Lloyd Cruz plays Popoy and Bea Alonzo plays Basha, whose relationship is tested by distance, personal growth, and conflicting dreams. The emotional tension comes from the disparity between where they are and what they want, and the painful choices in holding on or letting go.\n\nThe film is still widely quoted for its dialogue and resonated deeply with audiences, especially in how it captures the real heartbreak of losing something you thought would last forever." ,

AngPanday: "Ang Panday (1980) – An action-fantasy film starring Fernando Poe Jr., about a blacksmith named Flavio who forges a magical sword to battle evil forces led by the villain Lizardo.\n\nThe story combines folklore, heroism, fantasy elements, and moral lessons about sacrifice, courage, and fighting oppression. Flavio becomes a symbol of hope and resistance for people oppressed by tyranny.\n\nAng Panday is a beloved classic in Philippine cinema, inspiring remakes, sequels, and being part of the cultural fabric especially among fans of fantasy and folklore films." ,

ThatThingCalledTadhana: "That Thing Called Tadhana (2014) – A romantic indie film directed by Antoinette Jadaone following two strangers reeling from heartbreak who meet by chance at an airport.\n\nStars Angelica Panganiban and JM De Guzman. They embark on a road-trip that becomes more than just physical travel—it’s their journey of introspection, love, and finding oneself amid pain and hope.\n\nThe film’s simple charm, dialogue, and relatability made it a favorite among Millennials, praised for its emotional honesty and for redefining Filipino romance with nuance." ,

    javascript: "JavaScript is a programming language for creating interactive web content.",
    whatIsWeather: "Weather is the day-to-day state of the atmosphere in a particular place.",
    whatIsClimate: "Climate is the average weather conditions of a region over a long period.",
    addition: "Addition is the process of combining two or more numbers to get a total. It uses the plus (+) symbol. For example, 3 + 2 = 5.",
  subtraction: "Subtraction means taking one number away from another. It uses the minus (-) symbol. For example, 5 - 2 = 3.",
  multiplication: "Multiplication is repeated addition of a number. It uses the times (×) symbol. For example, 3 × 4 = 12.",
  division: "Division is splitting a number into equal parts. It uses the division (÷) symbol. For example, 12 ÷ 3 = 4.",
  fraction: "A fraction represents a part of a whole. It is written as one number over another, like 1/2. Fractions can be simplified.",
  decimal: "A decimal is another way to write fractions using a dot. For example, 0.5 means one-half. Decimals are widely used in money and measurements.",
  percentage: "A percentage shows a number as parts out of 100. The symbol is %. For example, 50% means half of something.",
  integer: "An integer is a whole number that can be positive, negative, or zero. It does not include fractions or decimals. Examples: -3, 0, 5.",
  even: "Even numbers are whole numbers divisible by 2. Examples are 2, 4, 6, and 8. They always end in 0, 2, 4, 6, or 8.",
  odd: "Odd numbers are whole numbers not divisible by 2. Examples are 1, 3, 5, and 7. They always end in 1, 3, 5, 7, or 9.",
  square: "A square number is the product of a number multiplied by itself. For example, 4 × 4 = 16. Squares are often used in geometry.",
  cube: "A cube number is the product of a number multiplied by itself three times. For example, 3 × 3 × 3 = 27. It relates to 3D volume shapes.",
  algebra: "Algebra is the branch of math using symbols and letters to represent numbers. It helps solve equations. Example: x + 2 = 5.",
  geometry: "Geometry is the study of shapes, sizes, and positions of figures. It includes points, lines, angles, and solids. It is used in design and construction.",
  angle: "An angle is formed when two lines meet at a point. Angles are measured in degrees. Common types are right, acute, and obtuse angles.",
  triangle: "A triangle is a three-sided polygon. The sum of its interior angles is always 180 degrees. Types include equilateral, isosceles, and scalene.",
  circle: "A circle is a round shape with all points the same distance from its center. The distance across is called the diameter. Circles are common in nature and design.",
  radius: "The radius is the distance from the center of a circle to any point on its edge. It is half the diameter. It is used to calculate area and circumference.",
  diameter: "The diameter is the distance across a circle through its center. It is twice the radius. It helps in finding the circle's circumference.",
  circumference: "Circumference is the distance around a circle. It is like the perimeter of a circle. Formula: 2 × π × radius.",
  one: "One is the first positive number used in addition. Adding one increases a number by a single step. For example, 5 + 1 = 6.",
  two: "Two is the second positive number. Adding two increases a number by a pair. For example, 7 + 2 = 9.",
  three: "Three is the third counting number. Adding three means moving forward three steps. For example, 4 + 3 = 7.",
  four: "Four is a basic whole number. Adding four increases any value by four units. For example, 6 + 4 = 10.",
  five: "Five is often used as a base in counting. Adding five means a jump of five units. For example, 3 + 5 = 8.",
  six: "Six comes after five in natural numbers. Adding six increases a number by six steps. For example, 2 + 6 = 8.",
  seven: "Seven is an odd number often used in math problems. Adding seven raises a number by seven. For example, 5 + 7 = 12.",
  eight: "Eight is an even number. Adding eight means an increase of eight. For example, 10 + 8 = 18.",
  nine: "Nine is the largest single-digit number. Adding nine moves a value forward by nine steps. For example, 6 + 9 = 15.",
  ten: "Ten is a base number in mathematics. Adding ten means increasing by a full set of ten. For example, 20 + 10 = 30.",
  eleven: "Eleven starts the two-digit numbers. Adding eleven increases a number by eleven. For example, 15 + 11 = 26.",
  twelve: "Twelve is commonly used in daily life (like a dozen). Adding twelve increases a value by twelve. For example, 8 + 12 = 20.",
  thirteen: "Thirteen is the first teen number after twelve. Adding thirteen means moving up by thirteen. For example, 10 + 13 = 23.",
  fourteen: "Fourteen is an even number. Adding fourteen makes a number larger by fourteen units. For example, 6 + 14 = 20.",
  fifteen: "Fifteen is a multiple of five. Adding fifteen increases a number by fifteen. For example, 5 + 15 = 20.",
  sixteen: "Sixteen is four sets of four. Adding sixteen means moving ahead by sixteen. For example, 9 + 16 = 25.",
  seventeen: "Seventeen is an odd number. Adding seventeen increases a number by seventeen. For example, 3 + 17 = 20.",
  eighteen: "Eighteen is two nines or three sixes. Adding eighteen raises a value by eighteen. For example, 2 + 18 = 20.",
  nineteen: "Nineteen is the last teen number. Adding nineteen increases a number by nineteen. For example, 11 + 19 = 30.",
  twenty: "Twenty is two tens. Adding twenty means increasing by twenty. For example, 15 + 20 = 35.",
  onePlusOne: "eleven",
  twoPlusTwo: "lapulapu",
  lovenel: "Gwapa kaau😘💕💕💕💕💕💕💕💕💕💕",
  createLoginForm: "Step 1: Create an HTML <form> with action and method attributes and add inputs for username/email and password; Step 2: Add client-side validation (required, pattern) and prevent default submit to validate before sending; Step 3: On submit send credentials to your server (HTTPS), then handle authentication and show success or error messages.",
  validateEmail: "Step 1: Use a simple regex or built-in form validation to check format on the client; Step 2: Revalidate on the server side to avoid fake requests (never trust client only); Step 3: Give clear error messages and, for homework, include test cases for valid and invalid emails.",
  responsiveDesign: "Step 1: Start with a flexible layout using relative units (%, em, rem) and a mobile-first CSS strategy; Step 2: Add media queries for breakpoints to adjust layout and font sizes; Step 3: Test on different screen sizes and use developer tools to iterate until the layout behaves correctly.",
  flexboxLayout: "Step 1: Set the container display to flex and choose flex-direction row/column; Step 2: Use justify-content and align-items to position children and flex properties (flex-grow/shrink) to control sizing; Step 3: For homework examples, build a header, content, footer layout and show how flex solves alignment problems.",
  gridLayout: "Step 1: Define grid container with grid-template-columns and grid-template-rows to create the base structure; Step 2: Place items using grid-column and grid-row or named areas for complex layouts; Step 3: Use gap and auto placement for spacing and responsiveness, and demonstrate with a sample card grid.",
  domSelection: "Step 1: Use document.getElementById, querySelector, or querySelectorAll to select elements; Step 2: Cache selections if reused and validate selection existence before accessing properties; Step 3: Manipulate properties or innerText, and show a small example replacing content on a button click.",
  addEventListener: "Step 1: Select the element and call addEventListener('event', handler) to attach a handler; Step 2: In the handler, use event.preventDefault() when intercepting form submissions or custom behavior; Step 3: Clean up listeners when necessary (removeEventListener) and demonstrate with click and submit events.",
  fetchAPI: "Step 1: Use fetch(url, { method, headers, body }) to call an API and return a promise; Step 2: Parse the response with response.json() and handle HTTP errors by checking response.ok; Step 3: Update the UI with results or show errors, and include a small example fetching /api/data.",
  asyncAwait: "Step 1: Mark functions async and use await before promises to write synchronous-looking code; Step 2: Wrap awaits in try/catch to handle errors and avoid unhandled rejections; Step 3: For homework, convert a promise chain into async/await and explain error flow.",
  promises: "Step 1: Create a promise with new Promise((resolve,reject)) for async tasks; Step 2: Consume with .then()/.catch() or async/await and chain operations carefully; Step 3: Show a sample promise that resolves after a timeout and explain how to test it.",
  gitInit: "Step 1: Run git init to create a repository and add a .gitignore for untracked files; Step 2: Use git add and git commit to record changes with clear messages; Step 3: If linking to remote, add origin and push your initial branch and demonstrate basic workflow.",
  gitBranch: "Step 1: Create a branch with git branch <name> or git checkout -b <name> to work independently; Step 2: Commit your changes on the branch and test them locally; Step 3: Push the branch to remote and open a pull request for review.",
  gitMerge: "Step 1: Ensure the target branch (e.g., main) is up to date, then run git merge <branch> to combine changes; Step 2: Resolve any merge conflicts by editing files and using git add to mark resolved files; Step 3: Commit the merge result and test the integrated codebase before pushing.",
  nodeServer: "Step 1: Initialize package.json (npm init) and install express (npm i express) for a basic server; Step 2: Create an app, set up routes like app.get/post, and start listening on a port; Step 3: Add error handling and test endpoints with curl or Postman for homework demonstration.",
  expressRoute: "Step 1: Define routes using app.get('/path', handler) or app.post for POST endpoints; Step 2: Extract parameters via req.params, req.query, and req.body (with body parser); Step 3: Validate inputs, handle errors and return JSON responses for client consumption.",
  connectMongoDB: "Step 1: Install a MongoDB driver or mongoose and create a connection string securely using environment variables; Step 2: Define schemas/models and perform CRUD operations using model methods; Step 3: Close the connection properly and write example queries for homework tasks.",
  createRestAPI: "Step 1: Design endpoints following REST principles (use nouns, HTTP methods: GET/POST/PUT/DELETE); Step 2: Implement routes with validation and proper status codes (200, 201, 400, 404, 500); Step 3: Document endpoints (readme or OpenAPI) and show a sample client consuming the API.",
  sqlSelect: "Step 1: Start with a basic SELECT column FROM table WHERE condition to retrieve rows; Step 2: Use joins, GROUP BY, and aggregation functions when summarizing data; Step 3: Parameterize queries to avoid injections and practice with sample tables.",
  sqlJoin: "Step 1: Identify related tables and choose the join type (INNER, LEFT, RIGHT) based on required rows; Step 2: Use ON clauses to match keys (e.g., users.id = orders.user_id); Step 3: Test queries with sample data and verify results for homework examples.",
  dbNormalization: "Step 1: Remove repeating groups and move to separate tables to achieve 1NF, then remove partial and transitive dependencies for 2NF/3NF; Step 2: Ensure each table has a primary key and relationships use foreign keys; Step 3: Provide normalized schema examples and explain benefits like reduced redundancy.",
  erDiagram: "Step 1: Identify entities, attributes, and relationships from the problem statement; Step 2: Draw boxes for entities and connect them with relationship lines, marking cardinalities (1:1, 1:N, N:M); Step 3: Translate the diagram into tables with primary and foreign keys for the database design.",
  cssCentering: "Step 1: For inline elements use text-align:center on the parent; Step 2: For block elements use margin:0 auto with a set width, or use flexbox: display:flex; justify-content:center; align-items:center; Step 3: Test both vertical and horizontal centering across screen sizes and show examples.",
  passwordHash: "Step 1: Never store plaintext passwords; use a library like bcrypt to generate salted hashes; Step 2: On signup hash the password and store the hash, on login compare hash with bcrypt.compare; Step 3: Use a strong work factor and rotate hashing strategies as needed.",
  jwtAuth: "Step 1: On successful login generate a JWT signed with a secret and include minimal user claims; Step 2: Send the token to the client (in Authorization header or secure cookie) and validate it on protected routes; Step 3: Handle expiration and token revocation strategies for secure homework implementations.",
  oauthOverview: "Step 1: Understand OAuth as a delegated authorization protocol, where the app requests scoped access from a provider; Step 2: Implement authorization code flow for server apps: redirect user, receive code, exchange it for tokens; Step 3: Securely store refresh tokens server-side and refresh access tokens when expired.",
  corsFix: "Step 1: Identify CORS errors originating from cross-origin requests blocked by the browser; Step 2: Configure server response headers (Access-Control-Allow-Origin, Methods, Headers) or use a CORS middleware; Step 3: For homework, show a minimal example enabling only trusted origins rather than '*'.",
  dockerizeApp: "Step 1: Create a Dockerfile defining base image, copy app files, install dependencies and set the CMD; Step 2: Build the image (docker build) and run a container for testing, exposing the needed port; Step 3: Use Docker Compose for multi-service setups and explain how to persist data with volumes.",
  packageJSON: "Step 1: Use npm init to create package.json and list project metadata and scripts; Step 2: Add dependencies with npm install --save and devDependencies for tooling; Step 3: Define useful scripts (start, test, build) to simplify running tasks for homework demos.",
  npmInstall: "Step 1: Run npm install <pkg> to add a dependency and save it in package.json; Step 2: Use --save-dev for tooling used only in development; Step 3: Commit package.json and package-lock.json and explain how collaborators reproduce the environment with npm ci.",
  unitTest: "Step 1: Choose a testing framework (Jest, Mocha) and write small, isolated tests for functions; Step 2: Mock external dependencies to test logic deterministically; Step 3: Run tests automatically via an npm script and show example assertions for homework tasks.",
  debugJS: "Step 1: Use console.log for quick inspection then upgrade to breakpoints in the browser devtools or VS Code debugger; Step 2: Step through code, inspect variables and call stack to find the root cause; Step 3: Add meaningful error handling and write a small failing test to prevent regressions.",
  binarySearch: "Step 1: Ensure the array is sorted, then compare the target to the middle element; Step 2: If the target is smaller search the left half, if larger search the right half and repeat; Step 3: Explain the loop or recursive implementation and note the O(log n) complexity for homework.",
  bubbleSort: "Step 1: Repeatedly compare adjacent elements and swap them if out of order; Step 2: Continue passes until no swaps occur, signaling the list is sorted; Step 3: Explain worst-case O(n²) complexity and why bubble sort is mainly educational.",
  mergeSort: "Step 1: Recursively split the array into halves until single-element arrays remain; Step 2: Merge pairs of sorted arrays by repeatedly selecting the smaller head element; Step 3: Explain that merge sort runs in O(n log n) and show a small sample merge step.",
  recursionExplain: "Step 1: Identify the base case and the recursive case to ensure termination; Step 2: Break the problem into smaller subproblems that resemble the original; Step 3: Trace a small example by hand (call stack) to show how recursion solves the problem and when to prefer iteration.",
  stackUsage: "Step 1: Use a stack to manage LIFO tasks such as undo operations or function call simulation; Step 2: Push items when entering tasks and pop when completed; Step 3: Provide an example like evaluating postfix expressions and explain complexity and memory usage.",
  queueUsage: "Step 1: Use a queue for FIFO processing such as task scheduling or breadth-first search; Step 2: Enqueue items when produced and dequeue when consumed; Step 3: Demonstrate with an example like print job handling and discuss performance characteristics.",
  linkedListBasics: "Step 1: Define node structure with value and pointer to next (and prev for doubly linked): Step 2: Implement insertion and deletion by updating pointers carefully to avoid leaks; Step 3: Walk through an example inserting at head and removing an element to show pointer updates.",
  binaryTreeTraverse: "Step 1: Choose traversal order (inorder, preorder, postorder) depending on the use case; Step 2: Implement recursion or iterative stack-based traversal to visit nodes; Step 3: Demonstrate inorder traversal for BSTs to get sorted order and discuss time complexity.",
  bigONotation: "Step 1: Identify the basic operations that grow with input size; Step 2: Express runtime in terms of n and simplify to highest-order term (drop constants and lower orders); Step 3: Give examples (O(1), O(n), O(n log n), O(n²)) and explain why it matters for algorithm choice.",
  memoryLeak: "Step 1: Identify sources like global variables or forgotten timers/closures holding references; Step 2: Remove unused references, clear timers and event listeners, and use profiling tools to find leaks; Step 3: Demonstrate a small example and show how to fix it by cleaning up resources.",
  cssSpecificity: "Step 1: Understand the precedence order: inline styles > IDs > classes/attributes > elements; Step 2: Avoid !important and prefer clearer selectors or component-scoped styles; Step 3: Show examples that resolve conflicts and explain how to calculate specificity values.",
  xssPrevention: "Step 1: Escape or sanitize all untrusted input before rendering in HTML and use proper content-type headers; Step 2: Use safe APIs (textContent or templating engines that auto-escape) and avoid innerHTML with untrusted data; Step 3: Implement input validation and Content Security Policy (CSP) as an extra defense layer.",
  sqlInjectionPrevention: "Step 1: Never concatenate user input into SQL; use parameterized queries or prepared statements instead; Step 2: Validate and sanitize inputs, enforce least privilege on DB accounts; Step 3: Show an example parameterized query and test injection attempts in a safe environment to verify protection.",
  accessibilityAltText: "Step 1: Provide descriptive alt attributes for images to help screen reader users; Step 2: Ensure interactive elements are keyboard accessible and have ARIA roles when needed; Step 3: Test with screen readers and automated accessibility tools and fix issues found.",
  seoBasics: "Step 1: Use semantic HTML and proper heading structure (h1..h6) so content is discoverable; Step 2: Add meta tags (title, description) and ensure pages load fast and are mobile-friendly; Step 3: Create meaningful URLs and sitemaps to help search engines index your site.",
  authenticateSession: "Step 1: On login create a secure session identifier stored server-side and set only an HttpOnly secure cookie on the client; Step 2: Validate session on each request and implement timeout/renewal policies; Step 3: Invalidate sessions on logout and rotate identifiers to mitigate fixation attacks.",
  setupTLS: "Step 1: Obtain a certificate from a trusted CA or use Let's Encrypt for free certificates; Step 2: Configure your web server (Nginx/Apache) to serve HTTPS and redirect HTTP to HTTPS; Step 3: Test certificate chain, enable strong TLS ciphers and set HSTS to improve security.",
  createCronJob: "Step 1: Decide the schedule for your task and write a small script that performs the job reliably; Step 2: Use crontab (Linux) or OS scheduler to register the job, testing it with a safe schedule first; Step 3: Log outputs and handle failures gracefully so you can debug missed runs during homework demonstrations.",
  howToInstallJava: "Step 1: Go to the official Oracle Java website. Step 2: Download the latest Java JDK installer for your operating system. Step 3: Run the installer and follow the instructions to complete the installation. Step 4: After installation, set the JAVA_HOME environment variable. Step 5: Test by opening a terminal and typing 'java -version'.",

  howToConnectDatabase: "Step 1: Install MySQL or another database server. Step 2: Create a new database and user with proper privileges. Step 3: Install a client library like MySQL Workbench or use command-line tools. Step 4: Use connection credentials (host, username, password, db name) to link your app. Step 5: Run test queries to confirm connection works.",

  howToCreateReactApp: "Step 1: Make sure Node.js and npm are installed on your computer. Step 2: Open the terminal and run 'npx create-react-app myapp'. Step 3: Navigate into the project folder using 'cd myapp'. Step 4: Start the development server with 'npm start'. Step 5: You can now edit the files in the src folder and see changes instantly in your browser.",

  howToUseGit: "Step 1: Install Git on your system. Step 2: Open a terminal and set your name and email with 'git config'. Step 3: Initialize a new repository using 'git init'. Step 4: Add files with 'git add .' and commit with 'git commit -m'. Step 5: Connect to GitHub using 'git remote add origin' and push with 'git push origin main'.",

  howToMakeWebsite: "Step 1: Create a folder for your website project. Step 2: Inside it, make an index.html file with basic HTML structure. Step 3: Add a style.css file for design and link it in the HTML. Step 4: Optionally add script.js for interactivity. Step 5: Open index.html in your browser to view your website.",

  howToInstallNode: "Step 1: Go to the official Node.js website. Step 2: Download the LTS version suitable for your operating system. Step 3: Run the installer and click next until it completes. Step 4: Test installation by typing 'node -v' and 'npm -v' in terminal. Step 5: Now you can use Node.js to run JavaScript outside a browser.",

  howToCodePython: "Step 1: Install Python from the official python.org website. Step 2: Open a code editor like VS Code. Step 3: Create a file called 'hello.py'. Step 4: Write print('Hello, World!') inside the file. Step 5: Run the file in terminal by typing 'python hello.py'.",

  howToCreateDatabaseTable: "Step 1: Open MySQL or PostgreSQL client. Step 2: Use 'CREATE DATABASE mydb;' to make a database. Step 3: Switch to it with 'USE mydb;'. Step 4: Create a table with 'CREATE TABLE students (id INT, name VARCHAR(50));'. Step 5: Insert values with 'INSERT INTO students VALUES (1, 'Ana');'.",

  howToMakeLoginSystem: "Step 1: Create an HTML form with username and password fields. Step 2: In your backend (PHP, Node.js, etc.), receive the form data. Step 3: Check the input against stored user records in a database. Step 4: If valid, create a session or token for the user. Step 5: Redirect to a dashboard, otherwise show an error.",

  howToMakeAlgorithm: "Step 1: Identify the problem clearly. Step 2: Break it into smaller logical steps. Step 3: Write pseudocode to outline the solution. Step 4: Convert pseudocode into actual programming language syntax. Step 5: Test and refine until the algorithm works correctly.",
  howToSetupLAN: "Step 1: Gather devices such as computers, switches, and network cables. Step 2: Connect each computer to the switch using Ethernet cables. Step 3: Assign IP addresses to each device in the same subnet. Step 4: Configure sharing options so files and printers can be accessed. Step 5: Test connectivity by pinging another computer on the LAN.",

  howToFindIPAddress: "Step 1: On Windows, press Win+R and type 'cmd' to open Command Prompt. Step 2: Type 'ipconfig' and press Enter. Step 3: Look for the 'IPv4 Address' under your active network. Step 4: On Linux or Mac, open terminal and type 'ifconfig' or 'ip addr'. Step 5: Record the address, as it identifies your device on the network.",

  howToPingDevice: "Step 1: Open Command Prompt or terminal. Step 2: Type 'ping' followed by the target IP address, such as 'ping 192.168.1.1'. Step 3: Press Enter and wait for results. Step 4: If replies show with time values, the device is reachable. Step 5: If 'request timed out', then the device might be offline or blocked.",

  howToShareInternet: "Step 1: Connect your computer to the internet. Step 2: Open network settings and enable 'Mobile Hotspot' or 'Internet Connection Sharing'. Step 3: Set a Wi-Fi name and password. Step 4: Turn on sharing, and other devices can connect using the password. Step 5: Test by connecting another phone or laptop.",

  howToSecureWiFi: "Step 1: Open your router settings by typing its IP address into a browser. Step 2: Login with admin credentials. Step 3: Go to wireless security settings. Step 4: Change the password to a strong one using numbers, letters, and symbols. Step 5: Enable WPA2 or WPA3 encryption to protect your Wi-Fi.",

  howToSetupRouter: "Step 1: Plug your router into the modem using an Ethernet cable. Step 2: Connect your computer to the router with another Ethernet cable or Wi-Fi. Step 3: Access the router settings by typing its IP (e.g., 192.168.1.1) into a browser. Step 4: Configure Wi-Fi name (SSID) and password. Step 5: Save and reboot the router to apply changes.",

  howToCheckNetworkSpeed: "Step 1: Connect your device to the internet. Step 2: Open a browser and visit a speed test website like speedtest.net. Step 3: Click 'Go' or 'Start'. Step 4: Wait for the test to complete and record download and upload speeds. Step 5: Compare results with your ISP plan to confirm if you are getting the promised speed.",

  howToSetupVPN: "Step 1: Subscribe to a VPN service or use a free one. Step 2: Download and install the VPN client on your device. Step 3: Open the app and log in with your account. Step 4: Select a server location from the list. Step 5: Click connect and confirm your IP has changed.",

  howToCheckConnectivity: "Step 1: Open Command Prompt or terminal. Step 2: Type 'ping 8.8.8.8' to test Google’s DNS server. Step 3: If replies are shown, your internet is working. Step 4: If no reply, check your router and modem connections. Step 5: Restart the device or call your ISP if the issue persists.",

  howToSetupFTP: "Step 1: Install an FTP server software like FileZilla Server. Step 2: Configure a username and password for access. Step 3: Set a folder directory for sharing files. Step 4: Give users the server IP and login details. Step 5: Clients can connect using FileZilla Client or command-line FTP.",
  DieHard: "Die Hard (1988), directed by John McTiernan, follows NYPD officer John McClane who finds himself trapped in a Los Angeles skyscraper during a terrorist takeover on Christmas Eve.\n\nThe film balances suspense, action, and humor, portraying McClane as a relatable everyman who must outsmart ruthless criminals.\n\nIt redefined action cinema, became a cultural touchstone, and launched a franchise that remains iconic decades later.",

Terminator2JudgmentDay: "Terminator 2: Judgment Day (1991), directed by James Cameron, continues the saga of man versus machine as the T-800 protects young John Connor from a new liquid-metal Terminator.\n\nThe movie explores fate, humanity, and the terrifying potential of artificial intelligence through groundbreaking special effects and character growth.\n\nIt is hailed as one of the greatest sequels and action films ever made, pushing visual effects to new heights and solidifying Arnold Schwarzenegger's status as a superstar.",

MadMaxFuryRoad: "Mad Max: Fury Road (2015), directed by George Miller, follows Max Rockatansky and Furiosa as they battle across a desert wasteland in a high-octane chase for freedom.\n\nThe film is nearly non-stop action, blending practical stunts with themes of survival, redemption, and rebellion against tyranny.\n\nIt was praised for its feminist themes, stunning cinematography, and redefined what modern action filmmaking could achieve, winning six Academy Awards.",

JohnWick: "John Wick (2014), directed by Chad Stahelski, introduces a retired hitman seeking vengeance after gangsters kill his dog, a final gift from his late wife.\n\nThe film blends sleek choreography, stylish gun-fu, and an underworld of assassins governed by its own rules, redefining action aesthetics.\n\nIt revitalized Keanu Reeves' career and spawned a franchise that reshaped modern action cinema with its balletic violence and lore.",

TheMatrix: "The Matrix (1999), directed by the Wachowskis, follows hacker Neo as he discovers the world is a simulated reality controlled by machines.\n\nBlending philosophy, martial arts, and revolutionary special effects, the film questions reality, control, and free will.\n\nIt transformed action filmmaking with bullet time, introduced iconic visuals, and became one of the most influential films of its era.",

Gladiator: "Gladiator (2000), directed by Ridley Scott, follows Roman general Maximus who seeks vengeance after being betrayed and forced into slavery.\n\nThe film explores themes of honor, revenge, and the corrupting influence of power, anchored by Russell Crowe’s powerful performance.\n\nIt reignited interest in historical epics, winning Best Picture and leaving a lasting cultural mark with its iconic line, 'Are you not entertained?'",

TheDarkKnight: "The Dark Knight (2008), directed by Christopher Nolan, sees Batman face his greatest test as the Joker plunges Gotham into chaos.\n\nIt’s not just an action film but a study of morality, chaos, and heroism, with Heath Ledger’s Joker delivering a legendary performance.\n\nIt redefined comic book movies, influencing the entire superhero genre and elevating action cinema into prestige filmmaking.",

LethalWeapon: "Lethal Weapon (1987), directed by Richard Donner, pairs a reckless cop with a seasoned veteran as they uncover a deadly drug ring.\n\nThe chemistry between Mel Gibson and Danny Glover, mixing humor and intensity, redefined the buddy-cop genre.\n\nIt spawned sequels, countless imitators, and remains a staple of '80s and '90s action cinema.",

Speed: "Speed (1994), directed by Jan de Bont, follows a cop who must stop a bus rigged to explode if it drops below 50 mph.\n\nThe film keeps adrenaline high with relentless tension, sharp pacing, and Keanu Reeves and Sandra Bullock’s breakout performances.\n\nIt became a massive hit, setting the standard for high-concept action thrillers.",

RamboFirstBlood: "First Blood (1982), directed by Ted Kotcheff, introduces John Rambo, a Vietnam veteran mistreated by authorities.\n\nMore character-driven than its sequels, it deals with trauma, alienation, and the struggles of war veterans.\n\nIt launched an action icon and franchise, shaping the '80s action hero archetype.",
Taken: "Taken (2008), directed by Pierre Morel, follows retired CIA operative Bryan Mills as he hunts down his daughter's kidnappers in Paris.\n\nWith its simple plot and Liam Neeson’s intense performance, the film became famous for its raw action and iconic 'particular set of skills' speech.\n\nIt reinvented Neeson as an unlikely action star and spawned a franchise, influencing countless revenge-thrillers.",

Commando: "Commando (1985), starring Arnold Schwarzenegger, follows a retired special forces soldier rescuing his kidnapped daughter.\n\nThe film is unapologetically over-the-top, filled with explosive set pieces and Schwarzenegger’s one-liners.\n\nIt cemented Arnold as an '80s action icon and became a cult favorite for its mix of brutality and camp.",

TheRaidRedemption: "The Raid: Redemption (2011), directed by Gareth Evans, showcases an elite SWAT team trapped in a Jakarta high-rise run by a crime lord.\n\nFamous for its relentless martial arts choreography and claustrophobic tension, the movie turned Iko Uwais into an international star.\n\nIt’s considered one of the greatest martial arts action films ever, inspiring Hollywood’s fight choreography for years.",

FaceOff: "Face/Off (1997), directed by John Woo, features an FBI agent and terrorist who literally swap faces.\n\nJohn Travolta and Nicolas Cage deliver wild performances, blending operatic gunfights with themes of identity and obsession.\n\nIt remains one of Woo’s best Hollywood works, admired for its insane premise and stylish action.",

PointBreak: "Point Break (1991), directed by Kathryn Bigelow, follows an FBI agent infiltrating a gang of surfer-bank robbers.\n\nThe film mixes crime drama, extreme sports, and deep bonds between hunter and hunted, with Keanu Reeves and Patrick Swayze’s electric chemistry.\n\nIt has since become a cult classic, inspiring remakes and influencing adrenaline-driven action cinema.",

Predator: "Predator (1987), directed by John McTiernan, pits a group of commandos against an alien hunter in the jungle.\n\nBlending sci-fi and action, it highlights themes of survival and primal fear while showcasing Arnold Schwarzenegger in peak form.\n\nThe film’s creature design and tense atmosphere made it a classic, spawning sequels and crossovers.",

CasinoRoyale: "Casino Royale (2006), directed by Martin Campbell, rebooted James Bond with Daniel Craig in a grittier, more realistic style.\n\nThe film focuses on Bond’s early career, his vulnerabilities, and his doomed romance with Vesper Lynd.\n\nIt revitalized the franchise, mixing brutal action with emotional depth, making Bond relevant for a new generation.",

BadBoys: "Bad Boys (1995), directed by Michael Bay, pairs Will Smith and Martin Lawrence as Miami detectives uncovering a drug ring.\n\nThe film mixes stylish car chases, explosive gunfights, and comedic banter, establishing Bay’s signature style.\n\nIt launched Smith into movie stardom and became a successful buddy-cop franchise.",

EnterTheDragon: "Enter the Dragon (1973), directed by Robert Clouse, stars Bruce Lee infiltrating a martial arts tournament to expose a crime lord.\n\nThe movie blends martial arts mastery with espionage elements, showcasing Lee’s charisma and philosophy.\n\nIt was Lee’s final completed film and remains one of the most influential martial arts action movies of all time.",

TheRock: "The Rock (1996), directed by Michael Bay, follows a rogue group of Marines threatening San Francisco with chemical weapons.\n\nFeaturing Sean Connery, Nicolas Cage, and high-octane action, the movie mixes military tension with Hollywood spectacle.\n\nIt’s widely regarded as one of Bay’s best films and a '90s action staple.",
DieHard2: "Die Hard 2 (1990), directed by Renny Harlin, brings John McClane back as terrorists seize an airport on Christmas Eve.\n\nThough similar to the first film, it expands the scope with larger set pieces and higher stakes.\n\nIt remains a fan favorite for its nonstop action and Bruce Willis’ relentless performance.",

DieHardWithAVengeance: "Die Hard with a Vengeance (1995) teams McClane with Zeus Carver (Samuel L. Jackson) as they solve riddles and stop a mad bomber in New York.\n\nThe chemistry between Willis and Jackson reinvigorated the franchise.\n\nIt balances clever puzzles with intense chases, keeping the Die Hard spirit alive.",

LiveFreeOrDieHard: "Live Free or Die Hard (2007) updates the formula with cyber-terrorism as McClane takes on hackers threatening the U.S. infrastructure.\n\nDespite criticism for toned-down violence, it delivers big stunts and Bruce Willis’ trademark grit.\n\nIt introduced McClane to a new generation while embracing modern tech threats.",

MadMax2: "Mad Max 2: The Road Warrior (1981) takes Max into a post-apocalyptic desert where he helps defend a fuel-rich colony from marauders.\n\nThe film is iconic for its brutal car chases, practical stunts, and dystopian visuals.\n\nIt redefined action cinema and solidified George Miller’s reputation as a master of the genre.",

MadMaxBeyondThunderdome: "Mad Max Beyond Thunderdome (1985) expands the Mad Max world, introducing Bartertown and the memorable 'Thunderdome' battles.\n\nThough less intense than its predecessor, it added mythic storytelling and Tina Turner’s powerful role.\n\nIt further established Max as a reluctant hero navigating chaos.",

Speed: "Speed (1994), directed by Jan de Bont, stars Keanu Reeves and Sandra Bullock in a thriller about a bus rigged to explode if it drops below 50 mph.\n\nThe film keeps audiences on edge with relentless tension and clever setups.\n\nIt became a '90s action classic and cemented Reeves and Bullock as stars.",

TrueLies: "True Lies (1994), directed by James Cameron, stars Arnold Schwarzenegger as a secret agent whose double life collides with his marriage.\n\nThe film mixes explosive action with comedy, particularly the dynamic between Arnold and Jamie Lee Curtis.\n\nIt remains one of Cameron’s most entertaining blockbusters.",

LethalWeapon: "Lethal Weapon (1987), directed by Richard Donner, introduced the mismatched cop duo of Mel Gibson and Danny Glover.\n\nIts mix of action, comedy, and buddy-cop chemistry set the template for countless imitators.\n\nIt launched a successful franchise and remains a gold standard for buddy action films.",

LethalWeapon2: "Lethal Weapon 2 (1989) brings Riggs and Murtaugh against corrupt South African diplomats.\n\nIt balances humor, explosive stunts, and personal stakes, while introducing fan-favorite character Leo Getz.\n\nThe sequel further solidified the franchise’s reputation.",

LethalWeapon3: "Lethal Weapon 3 (1992) explores aging cops and dangerous arms dealers.\n\nIt adds strong female character Lorna Cole (Rene Russo), who matches Riggs in combat.\n\nThe film delivers humor and spectacle while deepening character arcs.",

LethalWeapon4: "Lethal Weapon 4 (1998) reunites the cast against ruthless Chinese gangsters.\n\nThe film showcases Jet Li in his Hollywood debut, whose martial arts impressed audiences.\n\nIt closed the series with humor, family themes, and explosive action.",

ConAir: "Con Air (1997), starring Nicolas Cage, follows a group of dangerous convicts who hijack a prison plane.\n\nThe film is over-the-top with colorful villains, massive stunts, and Cage’s southern-hero persona.\n\nIt’s remembered as one of the most gloriously cheesy '90s action flicks.",

DemolitionMan: "Demolition Man (1993) pairs Sylvester Stallone with Wesley Snipes in a futuristic society where crime is nearly eliminated.\n\nTheir clash brings chaos to a sanitized world, mixing satire with action spectacle.\n\nIt has since become a cult classic for its humor, action, and social commentary.",

Cliffhanger: "Cliffhanger (1993), starring Sylvester Stallone, features mountain-climbing rescues against terrorists in the Rockies.\n\nThe movie is filled with daring stunts, breathtaking scenery, and physical intensity.\n\nIt was a box office success and showcased Stallone’s action versatility.",

FirstBlood: "First Blood (1982) introduces John Rambo, a Vietnam veteran mistreated by small-town authorities.\n\nUnlike later sequels, it is a mix of action and psychological drama, exploring trauma and alienation.\n\nIt spawned a legendary action series, with Rambo becoming a cultural icon.",

RamboFirstBloodPart2: "Rambo: First Blood Part II (1985) takes Rambo back to Vietnam on a rescue mission.\n\nIt shifts the tone to pure explosive action, with iconic bow-and-arrow sequences and massive battles.\n\nThough criticized for its politics, it became one of the biggest hits of the '80s.",

Rambo3: "Rambo III (1988) sees Rambo traveling to Afghanistan to rescue his mentor from Soviet forces.\n\nThe film amps up the action with larger-than-life battles and massive explosions.\n\nIt was once the most expensive film ever made and remains a hallmark of '80s spectacle.",

Rambo2008: "Rambo (2008), directed by Sylvester Stallone, portrays an older, brutal version of the character aiding missionaries in Burma.\n\nThe film is graphically violent, emphasizing the horrors of war.\n\nIt was praised for its rawness and bringing Rambo back to his darker roots.",

RamboLastBlood: "Rambo: Last Blood (2019) brings John Rambo into a final, personal battle against a Mexican cartel.\n\nIt blends action with themes of aging, loss, and revenge.\n\nThough divisive, it closed out the saga with brutal intensity.",

Expendables: "The Expendables (2010) unites action legends like Stallone, Statham, and Lundgren for a mercenary adventure.\n\nIt celebrates '80s-style mayhem with modern spectacle.\n\nIts nostalgic cast and big explosions made it a hit among action fans.",

Expendables2: "The Expendables 2 (2012) ups the ante with more stars, including Chuck Norris and Jean-Claude Van Damme as the villain.\n\nIt doubles down on self-aware humor and over-the-top combat.\n\nMany consider it the best of the series for its fun factor.",

Expendables3: "The Expendables 3 (2014) adds younger recruits alongside the veteran action stars.\n\nThough criticized for a PG-13 rating, it still delivers large-scale battles and camaraderie.\n\nIt remains a guilty pleasure for franchise fans.",

TheTransporter: "The Transporter (2002), starring Jason Statham, follows a professional driver who breaks his own rules when he discovers his cargo is human trafficking.\n\nThe film mixes martial arts, car stunts, and sleek European settings.\n\nIt launched Statham’s career as an international action star.",

Transporter2: "Transporter 2 (2005) moves the action to Miami, with Frank Martin protecting a kidnapped boy.\n\nIt amps up the stunts, featuring outrageous sequences like a car flipping mid-air to remove a bomb.\n\nThough less grounded, it remains entertaining for fans of wild action.",

Transporter3: "Transporter 3 (2008) continues the saga with Frank forced into a dangerous delivery.\n\nIt blends romance with high-octane action, showcasing more of Statham’s charisma.\n\nThough less acclaimed, it completed the trilogy.",

ManOnFire: "Man on Fire (2004), directed by Tony Scott, stars Denzel Washington as a bodyguard avenging the kidnapping of a girl in Mexico City.\n\nThe film is both stylish and emotionally powerful, with Washington delivering a career-defining performance.\n\nIt blends gritty violence with themes of redemption.",

InsideMan: "Inside Man (2006), directed by Spike Lee, follows a meticulously planned bank heist led by Clive Owen.\n\nThough more of a crime thriller, it delivers tense standoffs and clever twists.\n\nIt is praised for its intelligence, pacing, and performances by Denzel Washington and Jodie Foster.",

Shooter: "Shooter (2007), starring Mark Wahlberg, follows a sniper framed for an assassination attempt.\n\nIt’s filled with tactical action, conspiracy, and survival elements.\n\nThough formulaic, it gained a following and inspired a TV series adaptation.",

TheEqualizer: "The Equalizer (2014), starring Denzel Washington, follows a retired black-ops agent using his skills to protect the helpless.\n\nIt blends brutal action with themes of justice and morality.\n\nIt became a surprise hit and started a successful franchise.",

TheEqualizer2: "The Equalizer 2 (2018) continues Robert McCall’s vigilante crusade.\n\nIt deepens his character while maintaining intense action sequences.\n\nThough slower-paced, Washington’s performance elevates the film.",

TheEqualizer3: "The Equalizer 3 (2023) sees McCall protecting a town in Italy from the mafia.\n\nIt combines personal closure with violent retribution.\n\nIt was praised as a satisfying end to the trilogy.",

MissionImpossible: "Mission: Impossible (1996), directed by Brian De Palma, introduces Tom Cruise as Ethan Hunt.\n\nThe film is a stylish spy thriller with iconic set pieces like the vault heist.\n\nIt launched one of the most successful action franchises ever.",

MI2: "Mission: Impossible II (2000), directed by John Woo, amps up the spectacle with motorcycle duels and slow-motion gunfights.\n\nThough divisive, it reflects Woo’s unique style.\n\nIt remains memorable for its stunts and operatic tone.",

MI3: "Mission: Impossible III (2006), directed by J.J. Abrams, raises emotional stakes with Ethan’s personal life at risk.\n\nPhilip Seymour Hoffman delivers a chilling villain performance.\n\nThe film reinvigorated the series with heart and intensity.",

GhostProtocol: "Mission: Impossible – Ghost Protocol (2011), directed by Brad Bird, features daring set pieces like Tom Cruise climbing the Burj Khalifa.\n\nIt mixes humor, gadgets, and insane stunts.\n\nIt redefined the franchise and became a global hit.",

RogueNation: "Mission: Impossible – Rogue Nation (2015), directed by Christopher McQuarrie, introduces the Syndicate as a shadowy enemy.\n\nThe film is packed with breathtaking stunts like the plane hang sequence.\n\nIt balanced espionage with action, cementing the series’ consistency.",

Fallout: "Mission: Impossible – Fallout (2018) is considered the best in the franchise.\n\nIt features stunning sequences like the HALO jump and helicopter chase.\n\nIts emotional storytelling and stunts made it a modern action masterpiece.",

TopGun: "Top Gun (1986), directed by Tony Scott, stars Tom Cruise as a Navy pilot in a high-flying competition.\n\nIts mix of aerial stunts, romance, and iconic soundtrack defined '80s cool.\n\nIt became a cultural phenomenon and military recruitment booster.",

TopGunMaverick: "Top Gun: Maverick (2022) brings Tom Cruise back as a mentor to new pilots.\n\nThe film combines nostalgia with jaw-dropping practical flight sequences.\n\nIt was a massive critical and commercial success, hailed as one of the best legacy sequels.",

JohnWick: "John Wick (2014) introduced Keanu Reeves as a retired hitman seeking revenge.\n\nIt revitalized action cinema with its stylish gun-fu choreography.\n\nThe film spawned a beloved franchise and reshaped modern action filmmaking.",

JohnWick2: "John Wick: Chapter 2 (2017) expands the assassin underworld, with John breaking sacred rules.\n\nThe choreography and world-building are even more ambitious.\n\nIt cemented the series as one of the best modern action sagas.",

JohnWick3: "John Wick: Chapter 3 – Parabellum (2019) continues immediately after the second film, with Wick on the run from global assassins.\n\nThe action reaches new heights with horse chases, knife fights, and martial arts battles.\n\nIt is praised for relentless creativity and Reeves’ dedication.",

JohnWick4: "John Wick: Chapter 4 (2023) brings epic scale, global battles, and emotional closure for John’s journey.\n\nThe choreography is breathtaking, mixing samurai duels, shootouts, and car chases.\n\nIt is widely hailed as one of the greatest action films ever made.",

HardBoiled: "Hard Boiled (1992), directed by John Woo, stars Chow Yun-Fat as a cop battling gangsters.\n\nIt features Woo’s signature slow-motion shootouts and balletic violence.\n\nIt is considered one of the greatest action movies from Hong Kong cinema.",

PoliceStory: "Police Story (1985), starring Jackie Chan, blends dangerous stunts with comedy.\n\nChan risked his life performing insane sequences, including a glass-shattering pole slide.\n\nIt redefined martial arts cinema and solidified Chan’s international fame.",

PoliceStory2: "Police Story 2 (1988) continues Jackie Chan’s high-risk stunt work.\n\nIt balances action and humor while expanding the story.\n\nIt remains a strong sequel, showcasing Chan’s relentless creativity.",

RushHour: "Rush Hour (1998), pairing Jackie Chan with Chris Tucker, blends martial arts with comedy.\n\nTheir odd-couple chemistry made the film a global hit.\n\nIt launched a popular trilogy and brought Chan mainstream success in Hollywood.",

RushHour2: "Rush Hour 2 (2001) continues the adventures in Hong Kong, mixing action with comedy banter.\n\nIt expands the humor and exotic locations.\n\nIt was even more successful at the box office than the first film.",

RushHour3: "Rush Hour 3 (2007) reunites Chan and Tucker in Paris for another adventure.\n\nThough less acclaimed, it still delivers laughs and fights.\n\nIt wrapped up the trilogy with star power and fun chemistry.",
SamsungGalaxyS23Ultra: "The Samsung Galaxy S23 Ultra is Samsung’s 2023 flagship, featuring the Snapdragon 8 Gen 2 processor.\n\nIt comes with a 200MP main camera, dynamic AMOLED 120Hz display, and S-Pen support.\n\nAs a premium device, it redefines productivity and photography standards for Android smartphones.",

iPhone14ProMax: "The iPhone 14 Pro Max launched in 2022 and introduced Apple’s Dynamic Island.\n\nPowered by the A16 Bionic chip, it has a 48MP camera with ProRAW and Cinematic Mode.\n\nIt remains one of the most powerful and polished devices in Apple’s lineup.",

GooglePixel7Pro: "Google Pixel 7 Pro, released in 2022, highlights Google’s Tensor G2 processor.\n\nIt is renowned for its AI-driven photography and clean Android experience.\n\nThis device strengthens Google’s presence as a premium Android contender.",

OnePlus11: "The OnePlus 11 combines flagship performance with competitive pricing.\n\nEquipped with Snapdragon 8 Gen 2, it provides smooth gaming and multitasking.\n\nIts Hasselblad cameras and OxygenOS keep it relevant in the flagship race.",

Xiaomi13Pro: "The Xiaomi 13 Pro is powered by Leica-tuned cameras.\n\nIt has ultra-fast charging and Snapdragon 8 Gen 2 for blazing performance.\n\nIt rivals Samsung and Apple while keeping prices competitive.",

OppoFindX5Pro: "Oppo Find X5 Pro blends futuristic design with premium hardware.\n\nIt boasts Hasselblad-tuned cameras and vibrant AMOLED display.\n\nIt positions Oppo as a major global flagship competitor.",

VivoX90Pro: "The Vivo X90 Pro offers Zeiss co-engineered cameras.\n\nIts imaging system captures excellent low-light shots.\n\nThe phone also packs performance and sleek aesthetics, appealing to photo enthusiasts.",

HuaweiMate50Pro: "Huawei Mate 50 Pro delivers cutting-edge photography despite lacking Google services.\n\nIt comes with variable aperture camera tech, a rarity in smartphones.\n\nHuawei continues to push hardware innovation even with software restrictions.",

RealmeGT2Pro: "The Realme GT2 Pro is Realme’s first true flagship.\n\nIt uses Snapdragon 8 Gen 1 and eco-friendly design materials.\n\nIts affordability makes it a disruptor in the flagship space.",

AsusROGPhone7: "The Asus ROG Phone 7 is built for gamers.\n\nIt has Snapdragon 8 Gen 2, AMOLED 165Hz display, and advanced cooling systems.\n\nThis makes it the ultimate gaming phone in the market.",

SonyXperia1IV: "The Sony Xperia 1 IV is aimed at creators.\n\nIt offers continuous optical zoom and 4K HDR recording.\n\nSony blends professional camera expertise with smartphone versatility.",

NokiaX30: "The Nokia X30 emphasizes sustainability.\n\nIt’s made with recycled materials and offers decent midrange performance.\n\nWhile not a flagship killer, it appeals to eco-conscious consumers.",

MotorolaEdge30Ultra: "The Motorola Edge 30 Ultra features a 200MP camera.\n\nIts near-stock Android makes it lightweight and fast.\n\nMotorola is reviving its flagship relevance with this model.",

HonorMagic5Pro: "The Honor Magic 5 Pro delivers sleek design and powerful cameras.\n\nIts curved display and fast performance highlight Honor’s comeback.\n\nIt competes directly with Samsung and Xiaomi in the premium market.",

PocoF4GT: "The Poco F4 GT is a performance-focused device.\n\nIt includes magnetic shoulder triggers for gaming.\n\nWith affordability, it appeals to young gamers.",

InfinixZeroUltra: "The Infinix Zero Ultra introduces 180W fast charging.\n\nIt’s built to fully charge in under 15 minutes.\n\nThis positions Infinix as a challenger brand in global markets.",

TecnoPhantomX2Pro: "Tecno Phantom X2 Pro includes a retractable portrait lens.\n\nIt’s an innovation rarely seen in its price range.\n\nTecno is stepping into the premium segment with bold design.",

ZTEAxon40Ultra: "ZTE Axon 40 Ultra hides its front camera under the display.\n\nIt offers full-screen immersion without notches or cutouts.\n\nIt represents ZTE’s innovation-driven strategy.",

Meizu20Pro: "The Meizu 20 Pro emphasizes clean design and Flyme OS.\n\nIts hardware is solid with Snapdragon 8 Gen 2.\n\nThough niche, it appeals to loyal Meizu fans in China.",

LenovoLegionY90: "The Lenovo Legion Y90 is a gaming powerhouse.\n\nIt has dual cooling fans and customizable triggers.\n\nIt cements Lenovo’s position in gaming smartphones.",

SharpAquosR7: "The Sharp Aquos R7 is a Japan-exclusive flagship.\n\nIt features a 1-inch camera sensor co-developed with Leica.\n\nIt pushes mobile photography innovation in its region.",

MicromaxInNote2: "Micromax In Note 2 marks India’s local comeback brand.\n\nIt focuses on affordability while maintaining decent performance.\n\nIt targets the budget-conscious Indian consumer market.",

LavaAgni5G: "The Lava Agni 5G is another Indian-made smartphone.\n\nIt delivers 5G connectivity at an affordable price.\n\nThis supports India’s push for local smartphone production.",

NothingPhone1: "The Nothing Phone 1 gained attention for its transparent back.\n\nIt features Glyph Interface lights that give unique notifications.\n\nThis phone stands out with bold design choices in a crowded market.",
SamsungGalaxyZFold4: "The Galaxy Z Fold 4 is Samsung’s 2022 foldable flagship.\n\nIt refines the foldable experience with a sturdier hinge and multitasking software.\n\nAs a luxury device, it leads the future of foldable smartphones.",

SamsungGalaxyZFlip4: "The Galaxy Z Flip 4 appeals to users who love compact design.\n\nIt folds into a pocket-sized phone while offering flagship specs.\n\nIt brings style and innovation to Samsung’s lineup.",

iPhone13Mini: "The iPhone 13 Mini is Apple’s last compact flagship.\n\nIt offers the same A15 Bionic power in a smaller size.\n\nFans loved its portability, though sales were limited.",

iPhoneSE2022: "The iPhone SE 2022 packs Apple’s A15 Bionic into a budget body.\n\nIt retains the classic iPhone design with Touch ID.\n\nIt’s an affordable entry into the Apple ecosystem.",

GooglePixel6a: "The Pixel 6a is a budget-friendly Google device.\n\nIt retains strong camera performance powered by AI.\n\nThis makes it one of the best midrange phones for photography.",

GooglePixelFold: "The Google Pixel Fold is Google’s first foldable phone.\n\nIt blends Pixel’s camera software with foldable hardware.\n\nIt offers a new form factor for Google’s smartphone ecosystem.",

OnePlusNord2T: "The OnePlus Nord 2T continues the Nord legacy.\n\nIt offers strong performance at a midrange price.\n\nIt appeals to cost-conscious users wanting flagship-like features.",

OnePlusAce2: "The OnePlus Ace 2 focuses on value-for-money performance.\n\nIt uses Snapdragon 8+ Gen 1 and fast charging.\n\nThis model strengthens OnePlus’ presence in Asia.",

XiaomiRedmiNote12Pro: "The Redmi Note 12 Pro is part of Xiaomi’s budget-friendly lineup.\n\nIt includes 5G, solid cameras, and fast charging.\n\nIt’s designed for affordability without compromising too much.",

XiaomiMiMixFold2: "The Mi Mix Fold 2 pushes foldable innovation.\n\nIt is thinner and lighter than competitors, with Leica-tuned cameras.\n\nIt demonstrates Xiaomi’s ambition in premium markets.",

OppoReno9Pro: "The Oppo Reno 9 Pro blends style and performance.\n\nIt has a slim design and reliable hardware for daily use.\n\nThe Reno series continues to shine in mid-premium markets.",

OppoA96: "The Oppo A96 is a budget phone with large battery life.\n\nIt targets young users with design and endurance.\n\nIt ensures Oppo remains strong in the budget sector.",

VivoV25Pro: "The Vivo V25 Pro emphasizes stylish design.\n\nIt has a color-changing back and reliable cameras.\n\nIt appeals to younger audiences who value aesthetics.",

VivoY35: "The Vivo Y35 is a budget model focused on performance per dollar.\n\nIt provides 5G support and large battery.\n\nIt keeps Vivo competitive in the entry-level market.",

HuaweiP50Pocket: "The Huawei P50 Pocket is a foldable clamshell phone.\n\nIt has unique folding design and premium camera quality.\n\nIt highlights Huawei’s innovation despite software limitations.",

HuaweiNova10Pro: "The Nova 10 Pro emphasizes selfies.\n\nIt comes with dual front cameras and sleek design.\n\nIt appeals to younger users who focus on social media.",

RealmeNarzo50: "The Realme Narzo 50 is a gaming-centric budget phone.\n\nIt offers a high refresh rate screen for smooth play.\n\nRealme markets it toward young, entry-level gamers.",

RealmeC55: "The Realme C55 introduces a 'Mini Capsule' notification feature.\n\nIt mimics Apple’s Dynamic Island at an affordable price.\n\nThis innovation keeps Realme relevant in the budget space.",

AsusZenfone9: "The Asus Zenfone 9 is compact yet powerful.\n\nIt includes Snapdragon 8+ Gen 1 and strong cameras.\n\nIt appeals to users who want flagship specs in small size.",

SonyXperia5IV: "The Sony Xperia 5 IV offers professional-grade video features.\n\nIt is a smaller alternative to Xperia 1 IV.\n\nSony maintains its niche for creators and filmmakers.",

MotorolaRazr2022: "The Motorola Razr 2022 modernizes the classic Razr flip phone.\n\nIt has foldable OLED display and improved specs.\n\nIt combines nostalgia with modern technology.",

Honor70: "The Honor 70 is a midrange phone with stylish design.\n\nIt delivers solid cameras and performance.\n\nIt strengthens Honor’s foothold in global midrange markets.",

ZTERedMagic8Pro: "The ZTE Red Magic 8 Pro is a gaming beast.\n\nIt has active cooling fans and Snapdragon 8 Gen 2.\n\nIt appeals strongly to competitive mobile gamers.",

NothingPhone2: "The Nothing Phone 2 improves on the original.\n\nIt refines the Glyph Interface and boosts performance.\n\nNothing continues to innovate in phone design.",

Fairphone5: "The Fairphone 5 continues the sustainable journey.\n\nIt uses fair-trade materials and repairable modules.\n\nIt appeals to users who value ethical production.",
SamsungGalaxyS23Ultra: "The Samsung Galaxy S23 Ultra is a premium flagship phone released in 2023. It boasts cutting-edge hardware and advanced AI-driven features designed for both productivity and entertainment.\n\nIts design includes a massive 6.8-inch AMOLED display, S-Pen stylus, and a quad-camera system with a 200MP sensor. It is powered by Snapdragon 8 Gen 2 with top-tier battery performance.\n\nThe phone was praised worldwide for its photography and multitasking power, making it a popular choice among professionals and tech enthusiasts." ,

AppleiPhone14ProMax: "The iPhone 14 Pro Max, launched in 2022, represents Apple’s continued innovation in mobile devices. It introduced the new Dynamic Island feature, replacing the traditional notch.\n\nIt comes with a 6.7-inch Super Retina XDR OLED, the powerful A16 Bionic chip, and a triple-camera system with a 48MP main sensor. The build quality remains top-notch with surgical-grade stainless steel.\n\nThis iPhone quickly became one of the best-selling premium devices, solidifying Apple’s dominance in the smartphone market." ,

Xiaomi13Pro: "The Xiaomi 13 Pro was unveiled in late 2022 as a flagship device with strong camera capabilities. It was part of Xiaomi’s push into the premium phone market.\n\nThe phone featured a Leica-branded triple camera, Snapdragon 8 Gen 2 chipset, and a 120Hz LTPO AMOLED display. It supported super-fast 120W charging.\n\nIt was praised for delivering flagship-grade performance at a lower price compared to competitors, making it highly popular in Asia and Europe." ,

OnePlus1: "The OnePlus 11 is a 2023 flagship that marked OnePlus’ return to its performance-focused roots. It offered a near-stock Android experience with OxygenOS.\n\nIt comes with a Snapdragon 8 Gen 2, Hasselblad-tuned cameras, and a 6.7-inch AMOLED with 120Hz refresh rate. Its design combines minimalism with durability.\n\nThe device was praised for its affordability among flagships, making it a strong competitor to Samsung and Apple." ,

GooglePixel7Pro: "The Google Pixel 7 Pro was launched in 2022 as Google’s flagship AI-driven phone. It emphasizes photography and software intelligence.\n\nIt uses Google’s custom Tensor G2 chip, has a 6.7-inch LTPO OLED display, and an advanced triple-camera system with computational photography features. It also integrates exclusive AI tools like real-time translation.\n\nThe Pixel 7 Pro gained praise for its software experience and camera quality, becoming a favorite among photographers and Android enthusiasts." ,

HuaweiP50Pro: "The Huawei P50 Pro launched in 2021 as one of Huawei’s last major global releases before US restrictions limited its market. It emphasized design and photography.\n\nIt features a striking dual-ring camera module, Snapdragon/Kirin chip options, and OLED display with 120Hz refresh. The Leica partnership ensured top-tier photo results.\n\nDespite limited Google services, it gained attention in Asia and Europe for its innovative design and outstanding camera system." ,

OppoFindX5Pro: "The Oppo Find X5 Pro debuted in 2022 as Oppo’s premium flagship with a futuristic design. It continued Oppo’s streak of innovation in imaging.\n\nIt comes with a Snapdragon 8 Gen 1 processor, ceramic back design, and a Hasselblad-branded camera system. It also featured Oppo’s custom MariSilicon X NPU for better imaging.\n\nThe phone gained traction in Asia and Europe, positioning Oppo as a serious contender in the premium smartphone market." ,

VivoX80Pro: "The Vivo X80 Pro launched in 2022, emphasizing mobile photography and video. It cemented Vivo’s status as a leading smartphone maker in Asia.\n\nIt is powered by Snapdragon 8 Gen 1, features a Zeiss-branded quad-camera system, and has a large AMOLED display with 120Hz refresh. Its camera is particularly strong in low-light scenarios.\n\nThe device became a top choice for content creators, further boosting Vivo’s reputation for camera innovation." ,

RealmeGT2Pro: "The Realme GT 2 Pro launched in 2022 as Realme’s first true flagship device. It showcased Realme’s capability to compete with bigger brands.\n\nIt includes a Snapdragon 8 Gen 1 processor, 2K AMOLED display, and eco-friendly materials in its design. It also features a 150-degree ultra-wide camera.\n\nThe phone was praised for delivering premium features at an affordable price, attracting younger consumers worldwide." ,

AsusROGPhone6: "The Asus ROG Phone 6 is a 2022 gaming phone that focuses on performance and immersive experiences for mobile gamers.\n\nIt has a Snapdragon 8+ Gen 1, AMOLED display with 165Hz refresh, and a massive cooling system. It also features shoulder triggers and RGB lighting.\n\nIt quickly became the gold standard for gaming phones, loved by eSports players and mobile gamers globally." ,

SonyXperia1IV: "The Sony Xperia 1 IV was released in 2022 as a premium phone for creators. It emphasized photography and video capabilities.\n\nIt comes with a 4K OLED display, triple-camera system with real optical zoom, and a Snapdragon 8 Gen 1. Its design remains tall and slim with professional-grade tools.\n\nThe phone gained traction among content creators and filmmakers, though its high price limited mainstream adoption." ,

MotorolaEdge30Ultra: "The Motorola Edge 30 Ultra was released in 2022 as Motorola’s flagship comeback. It featured one of the world’s first 200MP cameras.\n\nIt runs on Snapdragon 8+ Gen 1, has a curved AMOLED display, and supports 125W fast charging. Its design is sleek and modern.\n\nThe phone boosted Motorola’s relevance in the global market, especially in Europe and Latin America." ,

NokiaX305G: "The Nokia X30 5G launched in 2022 as a sustainable smartphone under HMD Global. It focused on eco-friendly production and durability.\n\nIt comes with Snapdragon 695, AMOLED display, and dual cameras optimized for low-light performance. The build uses recycled aluminum and plastics.\n\nAlthough not a flagship, it appealed to eco-conscious consumers and helped Nokia regain attention in Europe." ,

InfinixZeroUltra: "The Infinix Zero Ultra launched in 2022 as an affordable flagship challenger. It was aimed at emerging markets like Africa and Southeast Asia.\n\nIt featured a 200MP camera, 120Hz AMOLED display, and 180W fast charging—the fastest in its category. It ran on MediaTek Dimensity chips.\n\nThe phone gained attention for delivering premium features at a fraction of the cost, making Infinix a rising global player." ,

TecnoPhantomX2Pro: "The Tecno Phantom X2 Pro launched in 2022 with an innovative retractable portrait camera. It positioned Tecno as more than just a budget brand.\n\nIt is powered by Dimensity 9000, has a 120Hz AMOLED display, and features strong imaging tools. Its standout feature was the world’s first retractable portrait lens in a smartphone.\n\nThe phone gained recognition in Africa, Asia, and the Middle East for its innovation and value." ,

ZTEAxon40Ultra: "The ZTE Axon 40 Ultra debuted in 2022 with a focus on under-display camera technology. It continued ZTE’s efforts to push futuristic designs.\n\nIt features Snapdragon 8 Gen 1, AMOLED curved display, and an invisible under-display selfie camera. It also has a triple 64MP camera system.\n\nThe phone gained praise for innovation, though it remained a niche choice compared to mainstream brands." ,

HonorMagic4Pro: "The Honor Magic4 Pro launched in 2022 as Honor’s flagship after splitting from Huawei. It focused on premium design and fast charging.\n\nIt runs on Snapdragon 8 Gen 1, has a curved OLED with 120Hz refresh, and a strong quad-camera system. It also featured 100W fast charging.\n\nThe phone signaled Honor’s comeback in the global market, especially in Europe and Asia." ,

LenovoLegionY90: "The Lenovo Legion Y90 is a 2022 gaming smartphone designed for hardcore gamers. It followed Lenovo’s tradition of high-performance gaming devices.\n\nIt has a massive 6.92-inch AMOLED with 144Hz refresh, Snapdragon 8 Gen 1, and dual cooling fans. It also supports gaming triggers.\n\nIt became a niche favorite for mobile gamers, though its large size limited mainstream use." ,

Fairphone4: "The Fairphone 4, launched in 2021, focused on ethical and sustainable smartphone production. It emphasizes repairability and fair trade.\n\nIt features Snapdragon 750G, a dual-camera system, and a 5-year warranty. The design allows easy part replacements.\n\nIt gained attention in Europe as the most ethical smartphone choice, appealing to eco-conscious users." ,

iQOO9Pro: "The iQOO 9 Pro launched in 2022 as a performance-focused phone under Vivo’s sub-brand. It targeted gamers and power users.\n\nIt runs on Snapdragon 8 Gen 1, features a 2K AMOLED display, and has a gimbal-stabilized camera system. Its design was sporty and futuristic.\n\nThe phone gained popularity in India and China, helping iQOO build a strong gaming phone reputation." ,

RedmiNote12Prot: "The Redmi Note 12 Pro+ launched in 2022 as part of Xiaomis famous Note lineup. It delivered flagship-like features in the mid-range category.It comes with a 200MP main camera, Dimensity 1080 chip, and 120W fast charging. Its design remained sleek with a glass finish.The phone was a big hit in India and Southeast Asia, showing Redmis strength in delivering value phones." ,

PocoF4GT: "The Poco F4 GT launched in 2022 as a budget gaming phone. It catered to gamers who wanted high performance at an affordable price.\n\nIt runs on Snapdragon 8 Gen 1, has shoulder triggers, and a 120Hz AMOLED display. It also supports 120W charging.\n\nThe phone became popular in Asia and Europe, establishing Poco as a gamer-friendly brand." ,

Meizu18sPro: "The Meizu 18s Pro launched in 2021 as Meizu’s premium device. It focused on clean design and smooth user experience.\n\nIt had a Snapdragon 888+, AMOLED display, and triple cameras. Meizu’s FlymeOS added customization features.\n\nAlthough limited to China, it gained praise for performance and design." ,

SharpAquosR7: "The Sharp Aquos R7 launched in 2022 with a focus on display and imaging. It continued Sharp’s tradition of innovation in Japan.\n\nIt featured Snapdragon 8 Gen 1, a 1-inch Leica camera sensor, and a Pro IGZO OLED display. Its design emphasized durability and minimalism.\n\nThe phone was highly praised in Japan but remained a niche device globally." ,
memoryRetention: "Memory retention is the ability to store and recall information over time.\n\nIt depends on brain structures such as the hippocampus and can be improved with practice, sleep, and focus.\n\nStrong memory retention allows humans to learn, adapt, and build knowledge across generations.",

problemSolving: "Problem solving is the cognitive ability to find solutions in complex or uncertain situations.\n\nIt involves creativity, logical reasoning, and critical thinking skills. Humans often combine past experience with new strategies.\n\nThis ability is key to survival, innovation, and everyday decision-making.",

emotionalIntelligence: "Emotional intelligence is the ability to understand and manage one’s emotions as well as others’ feelings.\n\nIt includes empathy, self-regulation, and social skills that shape personal and professional relationships.\n\nHigh emotional intelligence contributes to leadership, teamwork, and conflict resolution.",

physicalStrength: "Physical strength is the ability of muscles to exert force against resistance.\n\nIt develops through exercise, nutrition, and healthy body maintenance. Genetics also plays a role in muscle growth potential.\n\nStrength is essential for survival, work, sports, and overall well-being.",

creativity: "Creativity is the human ability to produce new and original ideas, solutions, or artistic expressions.\n\nIt blends imagination with knowledge to invent, design, or innovate beyond traditional thinking.\n\nCreativity drives culture, technology, and progress in human society.",

criticalThinking: "Critical thinking is the process of analyzing information objectively to make reasoned judgments.\n\nIt requires questioning assumptions, evaluating evidence, and considering multiple perspectives.\n\nThis ability protects against misinformation and improves decision-making.",

adaptability: "Adaptability is the ability to adjust to new conditions and environments.\n\nIt allows humans to survive changes in climate, society, and technology by learning and evolving behaviors.\n\nBeing adaptable ensures resilience in uncertain and challenging times.",

communicationSkills: "Communication skills involve expressing ideas clearly and understanding others.\n\nThey include verbal language, nonverbal cues, and digital interactions.\n\nEffective communication builds trust, resolves conflicts, and strengthens relationships.",

leadership: "Leadership is the ability to guide, inspire, and influence others.\n\nIt combines vision, decision-making, and empathy to direct groups toward common goals.\n\nGreat leaders shape communities, businesses, and historical events.",

empathy: "Empathy is the ability to sense and share the emotions of others.\n\nIt fosters compassion, understanding, and stronger social bonds.\n\nEmpathy reduces conflict and promotes cooperation in human societies.",

selfDiscipline: "Self-discipline is the capacity to control impulses and stay committed to goals.\n\nIt helps humans resist distractions and maintain consistency in habits.\n\nThis ability is critical for success in education, work, and personal development.",

analyticalThinking: "Analytical thinking is the skill of breaking down complex problems into smaller parts.\n\nIt involves logic, pattern recognition, and evaluation of data.\n\nThis ability is crucial in science, engineering, and strategic planning.",

timeManagement: "Time management is the ability to prioritize and use time effectively.\n\nIt requires planning, scheduling, and setting goals.\n\nGood time management increases productivity and reduces stress.",

resilience: "Resilience is the ability to recover quickly from difficulties and stress.\n\nIt involves mental toughness, optimism, and coping strategies.\n\nResilient people thrive despite adversity and inspire others with perseverance.",

focus: "Focus is the mental ability to concentrate on a task without distraction.\n\nIt requires self-control and the ability to filter irrelevant information.\n\nStrong focus improves efficiency, learning, and creative output.",

decisionMaking: "Decision making is the ability to choose between alternatives based on reasoning and values.\n\nIt blends logic, intuition, and experience.\n\nGood decision making leads to positive outcomes in personal and professional life.",

collaboration: "Collaboration is the ability to work effectively with others to achieve shared goals.\n\nIt relies on teamwork, respect, and collective problem-solving.\n\nCollaboration fuels progress in communities, organizations, and global efforts.",

negotiation: "Negotiation is the ability to reach agreements through discussion and compromise.\n\nIt requires persuasion, empathy, and clear communication.\n\nEffective negotiation resolves disputes and builds lasting partnerships.",

selfAwareness: "Self-awareness is the ability to recognize one’s thoughts, emotions, and behaviors.\n\nIt fosters personal growth by highlighting strengths and weaknesses.\n\nSelf-awareness improves emotional intelligence and interpersonal relationships.",

strategicThinking: "Strategic thinking is the ability to plan long-term actions for complex goals.\n\nIt combines foresight, analysis, and creativity.\n\nThis ability is vital for leadership, business, and personal success.",

spatialAwareness: "Spatial awareness is the ability to perceive and understand the position of objects in space.\n\nIt helps humans navigate environments, play sports, and drive safely.\n\nThis ability is essential in professions like architecture, surgery, and aviation.",

patience: "Patience is the ability to endure delays, stress, or hardship without frustration.\n\nIt requires emotional control and perspective.\n\nPatience leads to better decision-making and stronger relationships.",

intuition: "Intuition is the ability to understand or sense something instinctively without conscious reasoning.\n\nIt draws from subconscious experience and emotional cues.\n\nIntuition aids in quick decisions and creative insights.",

curiosity: "Curiosity is the desire to explore, learn, and understand new things.\n\nIt drives humans to ask questions, seek knowledge, and experiment.\n\nCuriosity fuels discovery, innovation, and lifelong learning.",

imagination: "Imagination is the human ability to form mental images and ideas beyond immediate reality.\n\nIt allows humans to create stories, inventions, and visions of the future.\n\nImagination enriches art, science, and culture.",
learningAbility: "Learning ability is the capacity to acquire new knowledge or skills through study and experience.\n\nIt relies on memory, focus, and adaptability to process information.\n\nA strong learning ability helps humans thrive in changing environments and careers.",

multitasking: "Multitasking is the ability to handle more than one task at the same time.\n\nIt requires cognitive flexibility and efficient attention switching.\n\nAlthough multitasking can reduce efficiency, it remains useful in fast-paced environments.",

creativityUnderPressure: "Creativity under pressure is the ability to generate solutions in stressful situations.\n\nStress activates focus and urgency, pushing people to think differently.\n\nThis skill is crucial in emergency response, leadership, and innovation.",

publicSpeaking: "Public speaking is the ability to communicate ideas effectively to an audience.\n\nIt combines clarity, confidence, and storytelling.\n\nStrong public speaking influences education, politics, and leadership.",

persuasion: "Persuasion is the skill of convincing others to adopt beliefs or take action.\n\nIt involves logic, emotional appeal, and credibility.\n\nPersuasion powers marketing, leadership, and diplomacy.",

handEyeCoordination: "Hand-eye coordination is the ability to synchronize vision with hand movements.\n\nIt depends on motor control and visual processing.\n\nThis ability is essential in sports, surgery, and skilled trades.",

endurance: "Endurance is the capacity to sustain effort and resist fatigue over long periods.\n\nIt develops through training, nutrition, and mental determination.\n\nEndurance is vital in athletics, survival, and demanding work.",

concentration: "Concentration is the ability to direct attention toward a single task for extended periods.\n\nIt involves ignoring distractions and maintaining mental effort.\n\nConcentration improves productivity, learning, and creativity.",

handDexterity: "Hand dexterity is the ability to perform precise and coordinated hand movements.\n\nIt requires fine motor skills, muscle control, and practice.\n\nDexterity supports arts, surgery, writing, and craftsmanship.",

logicalReasoning: "Logical reasoning is the ability to analyze facts and reach rational conclusions.\n\nIt follows structured patterns such as deduction and induction.\n\nThis ability is crucial in mathematics, science, and problem-solving.",

riskAssessment: "Risk assessment is the ability to evaluate potential dangers before making decisions.\n\nIt blends logic, past experiences, and foresight.\n\nThis skill prevents accidents, guides investments, and informs leadership.",

senseOfHumor: "Sense of humor is the ability to perceive and express amusement.\n\nIt involves creativity, timing, and social awareness.\n\nHumor strengthens bonds, reduces stress, and enhances communication.",

willpower: "Willpower is the inner strength to resist temptation and stay focused on goals.\n\nIt functions like a mental muscle that grows with discipline and practice.\n\nStrong willpower supports healthy habits and success.",

teamwork: "Teamwork is the ability to cooperate with others to achieve shared objectives.\n\nIt combines communication, empathy, and coordination.\n\nGood teamwork drives success in sports, workplaces, and communities.",

fastReflexes: "Fast reflexes are the body’s quick, automatic responses to stimuli.\n\nThey rely on the nervous system’s rapid communication between brain and muscles.\n\nReflexes protect from danger and improve athletic performance.",

musicalAbility: "Musical ability is the talent to perceive, create, and perform music.\n\nIt involves rhythm, pitch recognition, and emotional expression.\n\nThis ability enriches culture and provides emotional healing.",

visualThinking: "Visual thinking is the ability to process and communicate information through images and spatial patterns.\n\nIt uses diagrams, maps, and imagination to solve problems.\n\nEngineers, artists, and designers benefit from visual thinking.",

painTolerance: "Pain tolerance is the ability to endure discomfort or injury without breaking focus.\n\nIt depends on physical conditioning, mindset, and genetics.\n\nHigh tolerance aids athletes, soldiers, and patients in recovery.",

selfMotivation: "Self-motivation is the drive to take action without external pressure.\n\nIt relies on personal goals, passion, and discipline.\n\nSelf-motivated people achieve more and inspire others around them.",

innovation: "Innovation is the ability to develop new methods, tools, or ideas that improve life.\n\nIt combines creativity, experimentation, and persistence.\n\nInnovation fuels progress in technology, medicine, and society.",

attentionToDetail: "Attention to detail is the ability to notice and act on small but important elements.\n\nIt requires focus, patience, and precision.\n\nThis ability ensures quality in fields like design, science, and engineering.",

stressManagement: "Stress management is the ability to stay calm and effective under pressure.\n\nIt involves relaxation, planning, and emotional control.\n\nThis ability protects mental health and improves performance.",

charisma: "Charisma is the ability to attract, influence, and inspire others.\n\nIt blends confidence, charm, and communication skills.\n\nCharismatic individuals excel in leadership, entertainment, and social movements.",

senseOfDirection: "Sense of direction is the ability to navigate and orient oneself in environments.\n\nIt relies on memory, spatial awareness, and sometimes instinct.\n\nThis ability is essential in exploration, travel, and survival.",

curiosityDrivenLearning: "Curiosity-driven learning is the natural drive to explore knowledge beyond necessity.\n\nIt turns interest into active study and experimentation.\n\nThis ability expands creativity, innovation, and lifelong growth.",
idolatry: "Idolatry is the act of placing anything or anyone above God in devotion or worship.\n\nIn scripture, this included worshiping false gods or relying on material possessions instead of the Creator.\n\nThe consequence is separation from God, but repentance restores the relationship.",

pride: "Pride is disobedience through self-exaltation and refusal to humble oneself before God.\n\nIt is seen in biblical figures like Lucifer and King Nebuchadnezzar, who elevated themselves above God's will.\n\nPride leads to downfall, while humility invites God’s favor.",

lying: "Lying is disobedience by speaking falsehoods instead of truth.\n\nIt appears in daily life as deceit, half-truths, or denial of responsibility. In scripture, Ananias and Sapphira lied and faced severe consequences.\n\nGod values honesty, and truth builds trust and righteousness.",

greed: "Greed is disobedience through the uncontrolled desire for wealth, power, or possessions.\n\nIt manifests in exploiting others, hoarding, or failing to be generous. Judas Iscariot’s betrayal of Jesus for silver is a striking example.\n\nGreed blinds hearts to God, but generosity and contentment bring peace.",

rebellion: "Rebellion is open resistance against God’s commands or appointed authorities.\n\nIt appears in Israel’s repeated defiance in the wilderness and in Saul’s disobedience to God’s instructions.\n\nRebellion distances people from God, but obedience leads to blessing and guidance.",

murder: "Murder is the unlawful taking of innocent life, a grave act of disobedience to God.\n\nCain’s killing of Abel demonstrates the destructive power of jealousy and anger.\n\nThis sin corrupts societies, but forgiveness and transformation are possible through repentance.",

theft: "Theft is taking what does not belong to you, breaking God’s commandment.\n\nExamples range from stealing property to withholding wages. In scripture, Achan’s theft brought disaster to Israel.\n\nGod calls for honesty and restitution, promising provision for those who trust Him.",

adultery: "Adultery is unfaithfulness in marriage, betraying both spouse and God.\n\nDavid’s sin with Bathsheba reveals how lust leads to destructive choices.\n\nThe act shatters families and trust, but God offers forgiveness and renewal for the repentant.",

blasphemy: "Blasphemy is showing contempt or disrespect toward God’s name or holiness.\n\nIn scripture, Israel was warned not to misuse God’s name or treat sacred things lightly.\n\nBlasphemy hardens the heart, but reverence brings closeness to God.",

covetousness: "Covetousness is the sin of desiring what belongs to others.\n\nIt manifests in envy, dissatisfaction, and comparison. The tenth commandment warns against it.\n\nCovetousness breeds bitterness, but gratitude and trust in God bring contentment.",

dishonoringParents: "Dishonoring parents is failing to respect and obey the ones God placed in authority.\n\nExamples include neglect, rebellion, or open disrespect. The fifth commandment calls for honor to parents.\n\nDisrespect leads to broken families, while obedience brings blessing and long life.",

falseWitness: "Bearing false witness is lying or twisting the truth against others.\n\nIt may be gossip, slander, or false accusations. In scripture, false witnesses opposed Jesus during His trial.\n\nThis sin damages reputations and communities, but truth brings justice and healing.",

witchcraft: "Witchcraft is seeking power or knowledge through occult means instead of God.\n\nSaul’s visit to the medium of Endor is a biblical warning of this disobedience.\n\nIt opens the door to spiritual bondage, while trusting God brings freedom.",

drunkenness: "Drunkenness is excessive drinking that leads to loss of self-control.\n\nNoah’s shame after drinking shows how it can dishonor even the faithful.\n\nIt destroys health and families, but sobriety and discipline honor God.",

sexualImmorality: "Sexual immorality includes any sexual activity outside God’s design of marriage.\n\nThe Corinthians were warned to flee from immorality, as the body is God’s temple.\n\nThis sin corrupts the spirit, but purity restores intimacy with God.",

envy: "Envy is disobedience through resentment of others’ blessings or success.\n\nJoseph’s brothers sold him due to envy, showing how destructive it can be.\n\nEnvy robs joy, but love and gratitude produce peace.",

hatred: "Hatred is the rejection of God’s command to love others.\n\nCain’s hatred for Abel and the Pharisees’ hatred for Jesus illustrate this sin.\n\nIt breeds violence and division, but love fulfills God’s law.",

laziness: "Laziness is neglecting responsibilities given by God.\n\nThe parable of the talents warns against burying gifts instead of using them.\n\nIdleness wastes opportunities, but diligence leads to fruitfulness.",

ingratitude: "Ingratitude is failing to thank God for His blessings.\n\nIsrael often grumbled despite God’s provision in the wilderness.\n\nA thankless heart distances people from God, but gratitude draws His favor.",

hypocrisy: "Hypocrisy is pretending to be righteous outwardly while hiding sin inwardly.\n\nJesus rebuked the Pharisees for their hypocrisy.\n\nIt deceives others and blinds the soul, but sincerity leads to freedom.",
positiveAttitude: "A positive attitude is a mindset that focuses on hope, possibilities, and gratitude.\n\nPeople with this attitude face challenges with optimism and encourage others through their words and actions.\n\nIt leads to resilience, stronger relationships, and a more fulfilling life.",

negativeAttitude: "A negative attitude is a mindset centered on doubt, fear, and criticism.\n\nIt often appears as constant complaining or expecting the worst in situations.\n\nThis outlook can drain energy, damage relationships, and hinder personal growth.",

humbleAttitude: "A humble attitude is marked by modesty, respect, and openness to learning.\n\nIt is seen in people who recognize their strengths but also their dependence on others and on God.\n\nHumility builds trust, encourages cooperation, and attracts blessings.",

arrogantAttitude: "An arrogant attitude shows itself in pride, self-importance, and disregard for others.\n\nExamples include boasting or refusing correction, often leading to strained relationships.\n\nArrogance creates division, but humility fosters unity and peace.",

gratefulAttitude: "A grateful attitude recognizes and appreciates blessings, both big and small.\n\nIt is expressed through thankfulness in words, prayers, and actions.\n\nGratitude promotes joy, reduces stress, and strengthens one’s faith and outlook on life.",
calmAndComposed: "Some people remain calm and composed when bleeding.\n\nThey take deep breaths, assess the wound, and try to manage it logically rather than panicking.\n\nThis attitude often prevents further harm and helps them receive proper treatment quickly.",

panicStricken: "A panic-stricken attitude is when a person becomes overwhelmed by fear or shock at the sight of their own blood.\n\nThey may scream, cry, or even faint, making the situation worse.\n\nThis reaction delays treatment, but support and reassurance from others can help.",

selfReliant: "A self-reliant attitude shows when someone bleeding immediately tries to stop the wound themselves.\n\nThey may apply pressure, look for cloth to cover the wound, or attempt to walk to safety.\n\nWhile this independence can help, it may also risk worsening the injury without proper care.",

denialMindset: "A denial attitude is when someone bleeding refuses to admit they are seriously hurt.\n\nThey may brush it off, continue working, or say 'it’s nothing' despite obvious injury.\n\nThis can lead to infection or greater blood loss, showing the danger of underestimating wounds.",

helpSeeking: "A help-seeking attitude is when the injured person immediately calls for assistance.\n\nThey might shout for family, friends, or emergency services to help control the bleeding.\n\nThis openness to support often results in faster recovery and proper medical care.",



Fairphone4: "The Fairphone 4 emphasizes repairability and ethics.\n\nIt uses modular components, making self-repair possible.\n\nFairphone appeals to sustainability-focused users globally.",



    washington:
      "George Washington was the first President of the United States.",
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem("searchHistory");
        if (saved) setHistory(JSON.parse(saved));
      } catch (err) {
        console.log("Error loading history:", err);
      }
    };
    loadHistory();
  }, []);

  const saveToHistory = async (q, a) => {
    const newItem = { id: Date.now().toString(), question: q, answer: a };
    const updated = [newItem, ...history];

    // Local storage
    setHistory(updated);
    await AsyncStorage.setItem("searchHistory", JSON.stringify(updated));

    // Firestore
    try {
      await addDoc(collection(db, "searchHistory"), {
        question: q,
        answer: a,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Saved to Firestore");
    } catch (err) {
      console.log("❌ Firestore error:", err);
    }
  };

  const offlineSearch = () => {
    if (!question.trim()) {
      setAnswer("⚠️ Please type a question first.");
      return;
    }

    const key = question.toLowerCase().trim();
    const found = Object.keys(offlineData).find((k) =>
      key.includes(k.toLowerCase())
    );

    if (found) {
      const reply = `📂 Offline Result:\n${offlineData[found]}`;
      setAnswer(reply);
      saveToHistory(question, reply);
    } else {
      setAnswer("⚠️ No offline data found.");
    }
  };

  const handleInputChange = (text) => {
    setQuestion(text);
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = Object.keys(offlineData).filter((key) =>
      key.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionPress = (item) => {
    setQuestion(item);
    setSuggestions([]);
    const reply = `📂 Offline Result:\n${offlineData[item]}`;
    setAnswer(reply);
    saveToHistory(item, reply);
  };

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={{ position: "absolute", top: 20, left: 20 }}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home-outline" size={22} color="#00eaff" />
          <Text style={styles.homeBtnText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.homeBtn, { marginTop: 45 }]}
          onPress={() => router.push("/history")}
        >
          <Ionicons name="time-outline" size={22} color="#00eaff" />
          <Text style={styles.homeBtnText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>🤖 SmartAssist</Text>

      {/* Search input */}
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        placeholderTextColor="#aaa"
        value={question}
        onChangeText={handleInputChange}
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Search button */}
      <TouchableOpacity style={styles.button} onPress={offlineSearch}>
        <Text style={styles.buttonText}>🔍 Offline Search</Text>
      </TouchableOpacity>

      {/* Answer box */}
      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0f1f" },
  homeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    padding: 8,
    borderRadius: 20,
    marginBottom: 5,
  },
  homeBtnText: { color: "#00eaff", marginLeft: 6, fontWeight: "600" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#00eaff",
    marginTop: 50,
  },
  input: {
    borderWidth: 2,
    borderColor: "#00eaff",
    borderRadius: 50,
    padding: 15,
    fontSize: 18,
    backgroundColor: "#111827",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  suggestionBox: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    marginBottom: 15,
    padding: 5,
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  suggestionText: { color: "#00eaff", fontSize: 16 },
  button: {
    backgroundColor: "#00eaff",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: { color: "#0a0f1f", fontSize: 18, fontWeight: "bold" },
  answerBox: {
    flex: 1,
    backgroundColor: "#1f2937",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  answer: { fontSize: 16, color: "#e5e7eb" },
});
