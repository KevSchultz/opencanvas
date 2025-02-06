// App.jsx
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./App.css";
import { useCreateBlockNote } from "@blocknote/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Helper function to generate a random username.
function getRandomUsername() {
  const adjectives = [
    "Cool", "Swift", "Brave", "Happy", "Sly", "Mighty", "Clever", "Bold", "Fierce", "Gentle",
    "Loyal", "Noble", "Quick", "Wise", "Strong", "Fearless", "Graceful", "Playful", "Quiet",
    "Vigilant", "Wild", "Zany", "Daring", "Eager", "Friendly", "Gallant", "Heroic", "Jolly",
    "Keen", "Lively", "Merry", "Nimble", "Proud", "Radiant", "Spirited", "Tough", "Valiant",
    "Witty", "Zealous", "Adventurous", "Charming", "Diligent", "Energetic", "Faithful",
    "Generous", "Humble", "Inventive", "Joyful", "Kind", "Luminous", "Majestic", "Optimistic",
    "Patient", "Resilient", "Sincere", "Tenacious", "Unique", "Vibrant", "Warm", "Xenial",
    "Youthful", "Zestful"
  ];

  const animals = [
    "Fox", "Tiger", "Bear", "Hawk", "Wolf", "Lion", "Eagle", "Panther", "Leopard", "Falcon",
    "Jaguar", "Cheetah", "Cougar", "Owl", "Raven", "Shark", "Dolphin", "Whale", "Elephant",
    "Giraffe", "Zebra", "Kangaroo", "Koala", "Panda", "Penguin", "Rabbit", "Squirrel", "Deer",
    "Moose", "Buffalo", "Bison", "Horse", "Camel", "Llama", "Goat", "Sheep", "Cow", "Pig",
    "Chicken", "Duck", "Goose", "Turkey", "Peacock", "Parrot", "Swan", "Flamingo", "Crane",
    "Pelican", "Seagull", "Turtle", "Frog", "Toad", "Lizard", "Snake", "Crocodile", "Alligator",
    "Bat", "Beaver", "Otter", "Raccoon", "Skunk", "Badger", "Hedgehog", "Porcupine", "Armadillo",
    "Sloth", "Anteater", "Aardvark", "Platypus", "Wombat", "Tasmanian Devil", "Orangutan",
    "Chimpanzee", "Gorilla", "Baboon", "Mandrill", "Lemur", "Meerkat", "Hyena", "Jackal",
    "Vulture", "Condor", "Osprey", "Kite", "Buzzard", "Heron", "Stork", "Ibis", "Egret",
    "Woodpecker", "Kingfisher", "Hummingbird", "Sparrow", "Robin", "Bluejay", "Cardinal",
    "Finch", "Canary", "Goldfinch", "Warbler", "Thrush", "Blackbird", "Starling", "Magpie",
    "Jay", "Crow", "Rook", "Dove", "Pigeon", "Quail", "Partridge", "Grouse", "Pheasant",
    "Turkey", "Guinea Fowl", "Ostrich", "Emu", "Cassowary", "Kiwi", "Albatross", "Petrel",
    "Shearwater", "Gannet", "Booby", "Cormorant", "Anhinga", "Frigatebird", "Tropicbird",
    "Pelican", "Grebe", "Loon", "Penguin", "Auk", "Puffin", "Guillemot", "Murre", "Razorbill",
    "Dovekie", "Skua", "Jaeger", "Gull", "Tern", "Noddy", "Skimmer", "Sandpiper", "Curlew",
    "Godwit", "Snipe", "Woodcock", "Phalarope", "Avocet", "Stilt", "Oystercatcher", "Plovers",
    "Lapwing", "Dotterel", "Killdeer", "Turnstone", "Redshank", "Greenshank", "Yellowlegs"
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal =
    animals[Math.floor(Math.random() * animals.length)];
  // Append a random number to help ensure uniqueness.
  return `${randomAdjective} ${randomAnimal}`;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function App() {
  const doc = new Y.Doc();

  // Set up a y-websocket provider.
  const provider = new WebsocketProvider("ws://localhost:1234", "internet", doc);

  // Initialize BlockNote with collaboration enabled.
  const editor = useCreateBlockNote({
    collaboration: {
      provider, // The Yjs provider that transports updates
      fragment: doc.getXmlFragment("document-store"), // Where BlockNote data is stored in the Y.Doc
      user: {
        name: getRandomUsername(),
        color: getRandomColor(),
      },
      // Controls when user labels (for cursors) appear.
      showCursorLabels: "activity",
    },
  });

  return <BlockNoteView editor={editor} />;
}
