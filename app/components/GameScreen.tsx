type Question = {
    question: string;
    image: string;
};

type GameScreenProps = {
    currentQuestion: Question;
    currentPosition: number;
    currentQuestionIndex: number;
    totalQuestions: number;
};

export const GameScreen = ({
    currentQuestion,
    currentPosition,
    currentQuestionIndex,
    totalQuestions,
}: GameScreenProps) => (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <div
            className="text-center w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${currentQuestion.image})`,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backgroundBlendMode: "overlay",
            }}
        >
            <div className="text-white mb-8 text-xl">
                問題 {currentQuestionIndex + 1} / {totalQuestions}
            </div>
            <div
                style={{
                    fontSize: "48px",
                    margin: "20px 0",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                }}
                className="text-white"
            >
                {currentQuestion.question
                    .split("")
                    .map((char, index) => (
                        <span
                            key={index}
                            style={{
                                color: index < currentPosition ? "#ff0000" : "white",
                                textShadow:
                                    index < currentPosition
                                        ? "0 0 10px rgba(255, 0, 0, 0.7)"
                                        : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {char}
                        </span>
                    ))}
            </div>
        </div>
    </main>
); 