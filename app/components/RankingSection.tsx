type Score = {
    userName: string;
    score: number;
};

type RankingSectionProps = {
    title: string;
    scores: Score[];
    currentUserName: string;
};

export const RankingSection = ({ title, scores, currentUserName }: RankingSectionProps) => (
    <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-red-600">{title}</h3>
        {scores.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-red-500 animate-pulse">Loading scores...</p>
            </div>
        ) : (
            <div className="space-y-4">
                {scores.map((score, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-black/30 border border-red-900/50 rounded"
                    >
                        <span className={`text-lg`} style={{ fontWeight: score.userName === currentUserName ? "bold" : "normal" }}>
                            {index + 1}.{score.userName} {score.userName === currentUserName ? "(you)" : ""}
                        </span>
                        <span className="text-red-500">{score.score}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
); 