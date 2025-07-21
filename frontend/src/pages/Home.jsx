import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Play, Users, Trophy, BookOpen, Gamepad2, Calendar } from 'lucide-react';
import { mockAPI, testimonials } from '../mock/data';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const coursesData = await mockAPI.getCourses();
        // Get 3 featured courses from different categories
        const featured = [
          coursesData["FRC Temelleri"][0],
          coursesData["Kodlama"][0], 
          coursesData["Elektronik"][0]
        ];
        setFeaturedCourses(featured);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5AE32]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E5AE32]/10 via-white to-[#E5AE32]/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#E5AE32] text-white px-4 py-1">
                  Türkiye'nin #1 FRC Eğitim Platformu
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  FRC Dünyasına
                  <span className="text-[#E5AE32] block">Hoş Geldiniz</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Türkiye'deki lise öğrencileri ve acemi FRC takımları için hazırlanmış 
                  kapsamlı robotik eğitim içerikleri ile geleceğin mühendisleri olmaya hazırlanın.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button className="bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                    <Play className="mr-2" size={20} />
                    Kurslara Başla
                  </Button>
                </Link>
                <Link to="/games">
                  <Button variant="outline" className="border-[#E5AE32] text-[#E5AE32] hover:bg-[#E5AE32] hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                    <Gamepad2 className="mr-2" size={20} />
                    Oyunları Keşfet
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#E5AE32]">15+</div>
                  <div className="text-sm text-gray-600">Kurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#E5AE32]">500+</div>
                  <div className="text-sm text-gray-600">Öğrenci</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#E5AE32]">50+</div>
                  <div className="text-sm text-gray-600">Takım</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop" 
                  alt="FRC Robot"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute top-4 -right-4 w-full h-96 bg-[#E5AE32]/20 rounded-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-96 bg-[#E5AE32]/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Neden RobotikTR?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FRC robotik alanında uzmanlaşmış eğitmenlerden, interaktif içeriklerden ve 
              gerçek dünya deneyimlerinden faydalanın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-[#E5AE32]" />
                </div>
                <CardTitle className="text-xl">Kapsamlı Kurslar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  FRC'nin tüm alanlarını kapsayan detaylı kurs içerikleri. 
                  Başlangıçtan ileri seviyeye kadar öğrenin.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-4">
                  <Gamepad2 size={32} className="text-[#E5AE32]" />
                </div>
                <CardTitle className="text-xl">İnteraktif Oyunlar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Eğlenceli oyunlar ve simülasyonlar ile öğrendiklerinizi pekiştirin. 
                  Öğrenme sürecini keyifli hale getirin.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-4">
                  <Users size={32} className="text-[#E5AE32]" />
                </div>
                <CardTitle className="text-xl">Topluluk Desteği</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Türkiye'deki FRC topluluğu ile bağlantı kurun. 
                  Deneyimli takımlardan öğrenin ve network kurun.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Kurslar
            </h2>
            <p className="text-xl text-gray-600">
              En popüler ve etkili kurslarımızla FRC yolculuğunuza başlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Button className="bg-white text-[#E5AE32] hover:bg-gray-100">
                      <Play className="mr-2" size={16} />
                      Kursu Görüntüle
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">⏱️ {course.duration}</span>
                    <Link to={`/course/${course.id}`}>
                      <Button size="sm" className="bg-[#E5AE32] hover:bg-[#E5AE32]/90">
                        Detayları Gör
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-[#E5AE32] text-[#E5AE32] hover:bg-[#E5AE32] hover:text-white">
                Tüm Kursları Görüntüle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Öğrencilerimiz Ne Diyor?
            </h2>
            <p className="text-xl text-gray-600">
              Başarılı takımlarımızdan gelen gerçek deneyimler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm text-[#E5AE32]">
                        {testimonial.team}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E5AE32] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              FRC Yolculuğunuza Başlamaya Hazır mısınız?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Binlerce öğrenci gibi siz de robotik dünyasında uzmanlaşın. 
              Ücretsiz kurslarımızla başlayın!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-[#E5AE32] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <BookOpen className="mr-2" size={20} />
                  Ücretsiz Başla
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#E5AE32] px-8 py-3 text-lg font-semibold"
                onClick={() => alert('Takım girişi yakında aktif olacak!')}
              >
                <Users className="mr-2" size={20} />
                Takım Kaydı
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;