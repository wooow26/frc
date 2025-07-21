import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Play, Trophy, Code, Cpu, HelpCircle, CheckCircle, X } from 'lucide-react';
import { mockAPI } from '../mock/data';

const Games = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await mockAPI.getGames();
        setGames(gamesData);
        
        // Initialize game states
        const initialState = {};
        gamesData.forEach(game => {
          initialState[game.id] = {
            started: false,
            completed: false,
            score: 0,
            currentQuestion: 0
          };
        });
        setGameState(initialState);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const getGameIcon = (type) => {
    switch (type) {
      case 'trivia':
        return <HelpCircle size={32} className="text-[#E5AE32]" />;
      case 'coding':
        return <Code size={32} className="text-[#E5AE32]" />;
      case 'simulation':
        return <Cpu size={32} className="text-[#E5AE32]" />;
      default:
        return <Play size={32} className="text-[#E5AE32]" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Başlangıç':
        return 'bg-green-100 text-green-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'İleri':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const startGame = (game) => {
    setGameState(prev => ({
      ...prev,
      [game.id]: { ...prev[game.id], started: true }
    }));
    setSelectedGame(game);
  };

  const completeGame = (gameId, score) => {
    setGameState(prev => ({
      ...prev,
      [gameId]: { ...prev[gameId], completed: true, score }
    }));
    
    // Save to localStorage
    const gameResults = JSON.parse(localStorage.getItem('gameResults') || '{}');
    gameResults[gameId] = { score, completedAt: new Date().toISOString() };
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
    
    alert(`Tebrikler! ${score} puan aldınız!`);
    setSelectedGame(null);
  };

  const GameModal = ({ game, onClose }) => {
    if (!game) return null;

    const renderGameContent = () => {
      switch (game.type) {
        case 'trivia':
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">FRC Trivia Soruları</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-3">1. FIRST Robotics Competition ne zaman başladı?</p>
                  <div className="space-y-2">
                    <button className="block w-full text-left p-2 rounded border hover:bg-blue-50">A) 1989</button>
                    <button className="block w-full text-left p-2 rounded border hover:bg-blue-50">B) 1992</button>
                    <button className="block w-full text-left p-2 rounded border hover:bg-blue-50 bg-green-100">C) 1992 ✓</button>
                    <button className="block w-full text-left p-2 rounded border hover:bg-blue-50">D) 1995</button>
                  </div>
                </div>
                <Button 
                  className="bg-[#E5AE32] hover:bg-[#E5AE32]/90"
                  onClick={() => completeGame(game.id, 85)}
                >
                  Sonraki Soru
                </Button>
              </div>
            </div>
          );
        case 'coding':
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Java Kodlama Mücadelesi</h3>
              <div className="space-y-4">
                <p>Robotunuzu ileri hareket ettirmek için Java kodu yazın:</p>
                <textarea 
                  className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                  placeholder="// Robot sınıfınızı buraya yazın
public class Robot extends TimedRobot {
  // Kodunuz buraya...
}"
                />
                <Button 
                  className="bg-[#E5AE32] hover:bg-[#E5AE32]/90"
                  onClick={() => completeGame(game.id, 92)}
                >
                  Kodu Çalıştır
                </Button>
              </div>
            </div>
          );
        case 'simulation':
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Robot Tasarım Simülatörü</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Bileşenler</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-100 rounded cursor-pointer hover:bg-blue-200">
                      🔧 Şasi (Tank Drive)
                    </div>
                    <div className="p-2 bg-green-100 rounded cursor-pointer hover:bg-green-200">
                      ⚡ NEO Motor x4
                    </div>
                    <div className="p-2 bg-yellow-100 rounded cursor-pointer hover:bg-yellow-200">
                      📷 Limelight Kamera
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Robot Tasarımınız</h4>
                  <div className="border-2 border-dashed border-gray-300 h-32 rounded flex items-center justify-center">
                    <span className="text-gray-500">Bileşenleri buraya sürükleyin</span>
                  </div>
                </div>
              </div>
              <Button 
                className="bg-[#E5AE32] hover:bg-[#E5AE32]/90"
                onClick={() => completeGame(game.id, 78)}
              >
                Robotu Test Et
              </Button>
            </div>
          );
        default:
          return <p>Bu oyun henüz geliştirme aşamasında...</p>;
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{game.title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          {renderGameContent()}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5AE32]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Eğitici Oyunlar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FRC robotik dünyasını eğlenceli oyunlar ile keşfedin. 
            Bilginizi test edin, kodlama becerilerinizi geliştirin ve robot tasarım sürecini deneyimleyin.
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <Trophy size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">
                {Object.values(gameState).filter(state => state.completed).length}
              </CardTitle>
              <CardDescription className="text-lg">Tamamlanan Oyun</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <Play size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">3</CardTitle>
              <CardDescription className="text-lg">Mevcut Oyun</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <CheckCircle size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">
                {Math.round(Object.values(gameState).reduce((acc, state) => acc + state.score, 0) / Object.values(gameState).filter(state => state.completed).length) || 0}
              </CardTitle>
              <CardDescription className="text-lg">Ortalama Puan</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card 
              key={game.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-[#E5AE32]/50"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {getGameIcon(game.type)}
                  </div>
                </div>
                {gameState[game.id]?.completed && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                    {game.title}
                  </CardTitle>
                  <Badge className={`${getDifficultyColor(game.difficulty)} border-0`}>
                    {game.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {game.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  {game.type === 'trivia' && (
                    <span>📝 {game.questions} Soru</span>
                  )}
                  {game.type === 'coding' && (
                    <span>💻 {game.challenges} Mücadele</span>
                  )}
                  {game.type === 'simulation' && (
                    <span>🔧 {game.components} Bileşen</span>
                  )}
                  
                  {gameState[game.id]?.completed && (
                    <span className="text-green-600 font-medium">
                      ✅ {gameState[game.id].score} puan
                    </span>
                  )}
                </div>
                
                <Button 
                  className={`w-full font-semibold py-2 transition-all duration-200 ${
                    gameState[game.id]?.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white'
                  }`}
                  onClick={() => startGame(game)}
                >
                  {gameState[game.id]?.completed ? (
                    <>
                      <Trophy className="mr-2" size={16} />
                      Tekrar Oyna
                    </>
                  ) : (
                    <>
                      <Play className="mr-2" size={16} />
                      Oyuna Başla
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Play Section */}
        <div className="mt-20 bg-gradient-to-r from-[#E5AE32]/10 to-[#E5AE32]/5 rounded-2xl p-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
            Nasıl Oynanır?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E5AE32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold mb-2">Oyun Seçin</h4>
              <p className="text-gray-600">İlginizi çeken oyunu seçin ve "Oyuna Başla" butonuna tıklayın.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E5AE32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold mb-2">Mücadele Edin</h4>
              <p className="text-gray-600">Soruları yanıtlayın, kod yazın veya robot tasarlayın.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E5AE32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold mb-2">Puanınızı Alın</h4>
              <p className="text-gray-600">Performansınıza göre puan kazanın ve leaderboard'da yerinizi alın!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default Games;