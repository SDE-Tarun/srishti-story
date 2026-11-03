
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  Music2,
  Footprints,
  Trophy,
  Utensils,
  ArrowDown,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getMemories } from "./services/api";
import "./App.css";

const memories = [
  {
    number: "01",
    title: "Where it all began",
    subtitle: "ISI Campus · The first meeting",
    description:
      "It all started at a party on the ISI campus. Little did we know that one meeting would turn into such a beautiful friendship.",
    icon: Sparkles,
    category: "The beginning",
  },
  {
    number: "02",
    title: "The Instagram days",
    subtitle: "A little hello, endless conversations",
    description:
      "Then came the Instagram conversations. Slowly, we started knowing each other, sharing stories and becoming comfortable.",
    icon: Sparkles,
    category: "Getting closer",
  },
  {
    number: "03",
    title: "Our campus walks",
    subtitle: "Little walks, big conversations",
    description:
      "Walking around campus, talking about random things, sharing what was on our minds. Those ordinary moments became special.",
    icon: Footprints,
    category: "Little moments",
  },
  {
    number: "04",
    title: "Our Ashes Cricket Tournament",
    subtitle: "One team, one tournament, countless memories",
    description:
      "Remember our Ashes Cricket Tournament? We played on the same team and had so much fun. We may have lost the tournament, but you were an absolute star! Even after getting injured, you kept going and became our best bowler, taking the most wickets. The result didn't matter that day — the memories we made did. And honestly, I'll always remember your incredible bowling performance! ❤️",
    icon: Trophy,
    category: "Our cricket memories",
  },
  {
    number: "05",
    title: "Dancing & food dates",
    subtitle: "Parties, music and good food",
    description:
      "Dancing together at parties and going out to eat. Somehow, even the simplest plans became memorable.",
    icon: Utensils,
    category: "Favourite memories",
  },
];

const photoCaptions = [
  "A little piece of our beginning ♡",
  "Some conversations become memories",
  "The little moments I cherish",
  "Our unforgettable cricket memories 🏏",
  "More laughter, more memories ❤️",
];

function App() {
  const [opened, setOpened] = useState(false);
  const [savedMemories, setSavedMemories] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const data = await getMemories();
        setSavedMemories(data.memories || []);
      } catch (error) {
        console.error("Could not load memories:", error.message);
      }
    };

    loadMemories();
  }, []);

  const displayMemories = savedMemories.length
    ? savedMemories
    : memories;

  const getPhotoSrc = (memory, index) => {
    return (
      memory.imageUrl ||
      (index < 5
        ? `/images/srishti-memory-${index + 1}.jpeg`
        : "")
    );
  };

  const selectedMemory =
    selectedPhoto !== null
      ? displayMemories[selectedPhoto]
      : null;

  const selectedPhotoSrc =
    selectedMemory && selectedPhoto !== null
      ? getPhotoSrc(selectedMemory, selectedPhoto)
      : "";

  useEffect(() => {
    if (selectedPhoto === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedPhoto((current) =>
          (current + 1) % displayMemories.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedPhoto((current) =>
          (current - 1 + displayMemories.length) %
          displayMemories.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, displayMemories.length]);

  return (
    <main className="app">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <motion.div
        className="floating-heart heart-one"
        animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Heart fill="currentColor" />
      </motion.div>

      <motion.div
        className="floating-heart heart-two"
        animate={{ y: [0, 15, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles />
      </motion.div>

      <div className="top-label">
        <Sparkles size={14} />
        <span>A LITTLE SOMETHING FOR YOU</span>
        <Sparkles size={14} />
      </div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            key="welcome"
            className="welcome-section"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">To my favourite human</p>

            <h1>
              Hey, <span>Srishti</span>!
            </h1>

            <p className="welcome-description">
              Some people enter our lives and quietly become
              a beautiful part of our story.
              <br />
              You're one of those people.
            </p>

            <motion.div
              className="envelope"
              whileHover={{ y: -8, scale: 1.03 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity } }}
              onClick={() => setOpened(true)}
            >
              <div className="envelope-paper">
                <Heart fill="currentColor" size={30} />
                <span>A little note for you</span>
              </div>
              <div className="envelope-flap" />
              <div className="envelope-front" />
              <div className="envelope-seal">
                <Heart fill="currentColor" size={20} />
              </div>
            </motion.div>

            <button
              className="open-button"
              onClick={() => setOpened(true)}
            >
              Open your little surprise <span>→</span>
            </button>

            <p className="bottom-note">
              Made with lots of care, just for you ♡
            </p>
          </motion.section>
        ) : (
          <motion.section
            key="story"
            className="story-section"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="story-icon">
              <Music2 size={25} />
            </div>

            <p className="eyebrow">Our little journey</p>

            <h1>
              Every friendship has
              <br />
              a <span>story...</span>
            </h1>

            <p className="welcome-description">
              And ours started somewhere on the beautiful
              ISI campus.
            </p>

            <button
              className="open-button"
              onClick={() =>
                document
                  .getElementById("memories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let's go back in time <ArrowDown size={15} />
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {opened && (
        <motion.section
          id="memories"
          className="memories-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-heading">
            <span className="section-kicker">
              A COLLECTION OF LITTLE MOMENTS
            </span>

            <h2>
              Our little <span>memories</span>
            </h2>

            <p>
              The moments that may have seemed ordinary,
              but became a special part of my story.
            </p>
          </div>

          <div className="memory-timeline">
            {displayMemories.map((memory, index) => {
              const Icon =
                memories[index % memories.length].icon;
              const photoSrc = getPhotoSrc(memory, index);

              return (
                <motion.article
                  className={`memory-card ${
                    index % 2 === 0
                      ? "memory-left"
                      : "memory-right"
                  }`}
                  key={memory._id || memory.number || index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="memory-photo">
                    {photoSrc ? (
                      <button
                        className="memory-photo-button"
                        onClick={() => setSelectedPhoto(index)}
                        aria-label={`Open photo: ${memory.title}`}
                      >
                        <img
                          src={photoSrc}
                          alt={memory.title}
                          className="memory-image"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <div className="photo-placeholder">
                        <Icon size={32} />
                        <span>Our memory goes here</span>
                      </div>
                    )}

                    <span className="photo-caption">
                      {photoCaptions[index] ||
                        "A memory to cherish ♡"}
                    </span>

                    <span className="photo-tape" />
                  </div>

                  <div className="memory-content">
                    <span className="memory-category">
                      {memory.category || "A SPECIAL MEMORY"}
                    </span>

                    <h3>{memory.title}</h3>

                    <h4>
                      {memory.subtitle ||
                        memory.date ||
                        "A moment to remember"}
                    </h4>

                    <p>{memory.description}</p>

                    <Heart
                      className="memory-heart"
                      size={18}
                      fill="currentColor"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="memories-ending">
            <Star size={22} />
            <h2>And the best part?</h2>
            <p>
              There are still so many memories waiting
              to be made.
            </p>
            <span>♡</span>
          </div>

          {/* Heartfelt message */}
          <section className="heartfelt-section">
            <span className="section-kicker">
              A FEW WORDS FROM MY HEART
            </span>

            <h2>
              Things I want <span>you to know</span>
            </h2>

            <p className="heartfelt-intro">
              Because some things deserve to be said, not just felt.
            </p>

            <div className="heartfelt-card">
              {[
                "I'm genuinely blessed to have you as my best friend. You have become such a special part of my life.",
                "I've seen you laughing, smiling, crying and going through difficult days. And I want you to know that every version of you matters.",
                "You never have to pretend to be strong around me. You can overthink, cry, talk about the smallest things or simply be yourself.",
                "I know we have had misunderstandings and days when we didn't talk. But our friendship has always mattered to me, and I never wanted to give up on it.",
                "I may not always have the perfect solution to your problems, but I will always have time to listen, understand and stand beside you.",
              ].map((message, index) => (
                <motion.p
                  key={index}
                  className="heartfelt-line"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                >
                  <span className="message-heart">♡</span>
                  {message}
                </motion.p>
              ))}
            </div>
          </section>

          {/* Friendship promise */}
          <section className="promise-section">
            <div className="promise-card">
              <Sparkles size={24} />

              <p className="section-kicker">
                A PROMISE, ALWAYS
              </p>

              <h2>
                You will <span>never</span> have to face it alone.
              </h2>

              <p>
                No matter where life takes us, no matter how busy
                things get or how difficult a day feels, you will
                always have someone who genuinely cares, listens
                and stands by you.
              </p>

              <p className="promise-highlight">
                I'll always be in your corner, Srishti. ❤️
              </p>

              <Heart
                className="promise-heart"
                fill="currentColor"
                size={25}
              />
            </div>
          </section>

          {/* Final surprise */}
          <motion.section
            className="final-section"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="final-stars">
              <Sparkles size={25} />
              <Heart size={20} fill="currentColor" />
              <Sparkles size={25} />
            </div>

            <p className="section-kicker">BEFORE YOU GO...</p>

            <h2>
              Until our next <span>memory...</span>
            </h2>

            <p className="final-message">
              Thank you for being you, Srishti.
              Thank you for all the laughter, random conversations,
              silly moments and memories.
              <br />
              <br />
              Life will keep changing, new chapters will begin,
              and we may not always be around the same places.
              But I hope you always remember how special
              this friendship is to me.
            </p>

            <div className="final-quote">
              "Some friendships don't need everyday conversations.
              They just need to know that we're there for each other."
            </div>

            <div className="final-signature">
              <span>With lots of love and friendship,</span>
              <h3>Your forever friend ♡</h3>
            </div>

            <motion.button
              className="replay-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedPhoto(null);
                setOpened(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <Heart size={15} />
              Relive our little story
            </motion.button>
          </motion.section>
        </motion.section>
      )}

      {/* Full-screen photo gallery */}
      <AnimatePresence>
        {selectedPhoto !== null && selectedMemory && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 25 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
              >
                <X size={22} />
              </button>

              <img
                src={selectedPhotoSrc}
                alt={selectedMemory.title}
                className="lightbox-image"
              />

              <h3>{selectedMemory.title}</h3>

              <p>
                {photoCaptions[selectedPhoto] ||
                  "A little memory to cherish forever ♡"}
              </p>

              <div className="lightbox-controls">
                <button
                  onClick={() =>
                    setSelectedPhoto(
                      (selectedPhoto - 1 + displayMemories.length) %
                        displayMemories.length
                    )
                  }
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                  <span>Previous</span>
                </button>

                <span className="photo-counter">
                  {selectedPhoto + 1} / {displayMemories.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedPhoto(
                      (selectedPhoto + 1) %
                        displayMemories.length
                    )
                  }
                  aria-label="Next photo"
                >
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer>
        <span>MADE WITH</span>
        <Heart size={12} fill="currentColor" />
        <span>AND A LOT OF FRIENDSHIP</span>
      </footer>
    </main>
  );
}

export default App;
