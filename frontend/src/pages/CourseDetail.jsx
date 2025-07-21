import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Play, Clock, BarChart3, Users, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react';
import { mockAPI } from '../mock/data';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await mockAPI.getCourse(id);
        setCourse(courseData);
        
        // Check if user is enrolled (from localStorage)
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        setIsEnrolled(enrolledCourses.includes(parseInt(id)));
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseId = parseInt(id);
    
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setIsEnrolled(true);
      alert('Kursa başarıyla kaydoldunuz! İyi öğrenmeler.');
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
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

  const courseModules = [
    {
      id: 1,
      title: "Giriş ve Temel Kavramlar",
      duration: "30 dakika",
      type: "video",
      completed: false
    },
    {
      id: 2,
      title: "Pratik Uygulamalar", 
      duration: "45 dakika",
      type: "practice",
      completed: false
    },
    {
      id: 3,
      title: "İleri Seviye Konular",
      duration: "1 saat",
      type: "video",
      completed: false
    },
    {
      id: 4,
      title: "Final Projesi",
      duration: "2 saat",
      type: "project",
      completed: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5AE32]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kurs Bulunamadı</h1>
          <Link to="/courses">
            <Button className="bg-[#E5AE32] hover:bg-[#E5AE32]/90">
              Kurslara Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/courses">
            <Button variant="ghost" className="text-[#E5AE32] hover:bg-[#E5AE32]/10">
              <ArrowLeft className="mr-2" size={18} />
              Kurslara Geri Dön
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card className="overflow-hidden border-2 border-[#E5AE32]/20">
              <div className="aspect-video relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#E5AE32] hover:bg-gray-100 px-8 py-4 text-lg"
                    onClick={() => alert('Video oynatıcı yakında aktif olacak!')}
                  >
                    <Play className="mr-2" size={24} />
                    Kursu İzle
                  </Button>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={`${getLevelColor(course.level)} border-0 text-sm`}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1" size={16} />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-1" size={16} />
                    250+ öğrenci
                  </div>
                </div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-700">
                  {course.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Course Description */}
            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Kurs Hakkında
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed mb-4">
                    Bu kurs, FRC robotik yarışmalarında başarılı olmak isteyen öğrenciler için tasarlanmıştır. 
                    Pratik uygulamalar ve gerçek dünya örnekleri ile konuları derinlemesine öğreneceksiniz.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ne Öğreneceksiniz:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>FRC robotik yarışmalarının temel prensipleri</li>
                    <li>Pratik uygulamalar ve gerçek dünya örnekleri</li>
                    <li>Takım çalışması ve proje yönetimi becerileri</li>
                    <li>Problem çözme ve analitik düşünme teknikleri</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ön Koşullar:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Temel matematik bilgisi</li>
                    <li>FRC'ye ilgi ve merak</li>
                    <li>Öğrenmeye açık olmak</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Kurs İçeriği
                </CardTitle>
                <CardDescription>
                  {courseModules.length} modül • Toplam {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <div 
                      key={module.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-[#E5AE32]/10 rounded-full">
                          <span className="text-[#E5AE32] font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{module.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="mr-1" size={14} />
                            {module.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {module.completed && (
                          <CheckCircle size={20} className="text-green-500" />
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#E5AE32] hover:bg-[#E5AE32]/10"
                          onClick={() => alert('Modül oynatıcı yakında aktif olacak!')}
                        >
                          <Play size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="border-2 border-[#E5AE32] bg-[#E5AE32]/5">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-[#E5AE32] mb-2">ÜCRETSİZ</div>
                    <p className="text-gray-600">Tam erişim ile</p>
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center text-green-600 font-semibold">
                        <CheckCircle className="mr-2" size={20} />
                        Kursa Kayıtlısınız
                      </div>
                      <Button 
                        className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white"
                        onClick={() => alert('Kurs oynatıcı yakında aktif olacak!')}
                      >
                        <Play className="mr-2" size={18} />
                        Kursa Devam Et
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-3"
                      onClick={handleEnroll}
                    >
                      <BookOpen className="mr-2" size={18} />
                      Ücretsiz Kayıt Ol
                    </Button>
                  )}

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>✓ Sınırsız erişim</div>
                    <div>✓ Tüm materyaller dahil</div>
                    <div>✓ Topluluk desteği</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="border-2 border-[#E5AE32]/20">
              <CardHeader>
                <CardTitle className="text-lg">Kurs İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seviye:</span>
                    <Badge className={`${getLevelColor(course.level)} border-0`}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Süre:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Öğrenci:</span>
                    <span className="font-medium">250+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dil:</span>
                    <span className="font-medium">Türkçe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sertifika:</span>
                    <span className="font-medium text-[#E5AE32]">Mevcut</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="border-2 border-[#E5AE32]/20">
              <CardHeader>
                <CardTitle className="text-lg">Eğitmen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Eğitmen"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Mehmet Özkan</h4>
                    <p className="text-sm text-gray-600 mb-2">FRC Mentör • 8 yıl deneyim</p>
                    <p className="text-xs text-gray-500">
                      Türkiye FRC topluluğunun önde gelen isimlerinden. 
                      50+ takıma mentorluk yapmıştır.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;