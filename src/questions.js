// export const questions = [
//     {
//         question: "A mysterious fog surrounds you in the Forbidden Forest. You see four paths. Which do you take?",
//         image: "https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "The path illuminated by a soft, ancient blue glow.", house: "Ravenclaw" },
//             { text: "The path where you hear a friend's voice calling for help.", house: "Hufflepuff" },
//             { text: "The darkest path – it's the quickest way through.", house: "Slytherin" },
//             { text: "The path with the most obstacles, leading to a bright clearing.", house: "Gryffindor" }
//         ]
//     },
//     {
//         question: "You find an ancient book that promises to reveal one truth. What do you ask?",
//         image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "How can I achieve greatness and leave a legacy?", house: "Slytherin" },
//             { text: "How can I protect the ones I love from any harm?", house: "Hufflepuff" },
//             { text: "What is the hidden meaning of the universe?", house: "Ravenclaw" },
//             { text: "How can I find the courage to face my greatest fear?", house: "Gryffindor" }
//         ]
//     },
//     {
//         // მე-3 კითხვა: ტროლი და ხიდი (ახალი ლინკი)
//         question: "A bridge you need to cross is guarded by a Troll. He demands a toll. What is your move?",
//         image: "https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=800",
//         options: [
//             { text: "Challenge the Troll to a fair duel.", house: "Gryffindor" },
//             { text: "Trick the Troll into letting you pass for free.", house: "Slytherin" },
//             { text: "Offer the Troll your sandwich and have a chat.", house: "Hufflepuff" },
//             { text: "Find a way to outsmart the Troll using a riddle.", house: "Ravenclaw" }
//         ]
//     },
//     {
//         question: "Which of these magical artifacts appeals to your soul the most?",
//         image: "https://images.unsplash.com/photo-1547919307-1ecb10702e6f?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "A ring that grants you influence over others.", house: "Slytherin" },
//             { text: "A mirror that shows your happiest memories.", house: "Hufflepuff" },
//             { text: "A sword that never blunts in battle.", house: "Gryffindor" },
//             { text: "An hourglass that shows the flow of time.", house: "Ravenclaw" }
//         ]
//     },
//     {
//         question: "If you could brew a potion that would grant you one thing, it would be:",
//         image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "Clarity of mind.", house: "Ravenclaw" },
//             { text: "Unyielding loyalty.", house: "Hufflepuff" },
//             { text: "Limitless ambition.", house: "Slytherin" },
//             { text: "Pure adrenaline.", house: "Gryffindor" }
//         ]
//     },
//     {
//         // მე-6 კითხვა: საფულე და გალეონები (ახალი ლინკი)
//         question: "You find a lost wallet full of Galleons in the hallway. No one is looking. What do you do?",
//         image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
//         options: [
//             { text: "Take it – it's a gift from fate for my future goals.", house: "Slytherin" },
//             { text: "Hand it to a teacher immediately.", house: "Hufflepuff" },
//             { text: "Look for the owner yourself; it's the right thing to do.", house: "Gryffindor" },
//             { text: "Analyze the contents to find a clue about the owner.", house: "Ravenclaw" }
//         ]
//     },
//     {
//         // მე-7 კითხვა: დემენტორი და პატრონუსი (ახალი ლინკი)
//         question: "A Dementor is approaching! What memory do you use for your Patronus?",
//         image: "https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=800",
//         options: [
//             { text: "The day you achieved a long-awaited victory.", house: "Slytherin" },
//             { text: "A quiet dinner with your closest friends.", house: "Hufflepuff" },
//             { text: "The moment you finally understood a complex truth.", house: "Ravenclaw" },
//             { text: "The time you stood up for someone weaker than you.", house: "Gryffindor" }
//         ]
//     },
//     {
//         question: "Which of these legendary creatures would you like as a companion?",
//         image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "A Phoenix – loyal and immortal.", house: "Gryffindor" },
//             { text: "A Dragon – powerful and feared.", house: "Slytherin" },
//             { text: "An Owl – wise and silent.", house: "Ravenclaw" },
//             { text: "A House-elf – helpful and kind.", house: "Hufflepuff" }
//         ]
//     },
//     {
//         question: "You are in the Room of Requirement. What does it become for you?",
//         image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
//         options: [
//             { text: "A library with every book ever written.", house: "Ravenclaw" },
//             { text: "A training ground to master your skills.", house: "Gryffindor" },
//             { text: "A secret headquarters to plan your rise to power.", house: "Slytherin" },
//             { text: "A cozy room with a warm fireplace and snacks.", house: "Hufflepuff" }
//         ]
//     },
//     {
//         // მე-10 კითხვა: ქუდი და ჩურჩული (ახალი ლინკი)
//         question: "The Sorting Hat is on your head. You can whisper one thing to it. What is it?",
//         image: "https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800",
//         options: [
//             { text: "Put me where I can prove my worth.", house: "Gryffindor" },
//             { text: "Put me where I will find true friends.", house: "Hufflepuff" },
//             { text: "Put me where I can learn the most.", house: "Ravenclaw" },
//             { text: "Put me where I can reach my full potential.", house: "Slytherin" }
//         ]
//     }
// ];