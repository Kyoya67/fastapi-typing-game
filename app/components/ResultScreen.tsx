import { RankingSection } from "./RankingSection";

type Score = {
    userName: string;
    score: number;
};

type ResultScreenProps = {
    userName: string;
    totalTime: number;
    score: number;
    topScores: Score[];
    bottomScores: Score[];
};

export const ResultScreen = ({
    userName,
    totalTime,
    score,
    topScores,
    bottomScores,
}: ResultScreenProps) => (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="text-center p-8 bg-black/50 rounded-lg border border-red-800 shadow-2xl max-w-2xl w-full">
            <h2
                className="text-4xl font-bold mb-6 text-red-600"
                style={{ textShadow: "0 0 10px rgba(255, 0, 0, 0.7)" }}
            >
                Result
            </h2>
            <div className="mb-8 space-y-2">
                <p className="text-xl">
                    Player: <span className="text-red-500">{userName}</span>
                </p>
                <p className="text-xl">
                    Time:{" "}
                    <span className="text-red-500">
                        {(totalTime / 1000).toFixed(2)} sec
                    </span>{" "}
                </p>
                <p className="text-xl">
                    Score: <span className="text-red-500">{score}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RankingSection
                    title="Top Ranking"
                    scores={topScores}
                    currentUserName={userName}
                />
                <RankingSection
                    title="Bottom Ranking"
                    scores={bottomScores}
                    currentUserName={userName}
                />
            </div>
        </div>
    </main>
); 