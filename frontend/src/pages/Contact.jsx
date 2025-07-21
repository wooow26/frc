import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, Phone, MapPin, Send, Clock, Users, HelpCircle } from 'lucide-react';
import { mockAPI } from '../mock/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await mockAPI.submitContact(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} className="text-[#E5AE32]" />,
      title: "E-posta",
      details: "info@robotiktr.com",
      description: "Genel sorularınız için"
    },
    {
      icon: <Users size={24} className="text-[#E5AE32]" />,
      title: "Takım Desteği", 
      details: "team-support@robotiktr.com",
      description: "Takım kayıt ve yardım"
    },
    {
      icon: <HelpCircle size={24} className="text-[#E5AE32]" />,
      title: "Teknik Destek",
      details: "tech@robotiktr.com", 
      description: "Platform ve kurs desteği"
    }
  ];

  const faqItems = [
    {
      question: "Platform tamamen ücretsiz mi?",
      answer: "Evet! RobotikTR'daki tüm kurslar ve oyunlar tamamen ücretsizdir. Türk FRC topluluğuna destek olmak için bu platformu geliştirdik."
    },
    {
      question: "Yeni takım nasıl kurulur?",
      answer: "Yeni takım kurmak için önce FIRST'e kayıt olmanız gerekir. Size bu süreçte yardımcı olmak için detaylı rehberlerimiz mevcuttur."
    },
    {
      question: "Kurs sertifikası alabilir miyim?", 
      answer: "Şu anda sertifika sistemi geliştirme aşamasındadır. Yakında kurs tamamlama sertifikaları sunmayı planlıyoruz."
    },
    {
      question: "Offline kurs materyalleri var mı?",
      answer: "Bazı kurslarımızın PDF versiyonları mevcuttur. İndirme linkleri kurs sayfalarında bulunmaktadır."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. 
            FRC topluluğuna destek olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Send className="mr-3 text-[#E5AE32]" size={28} />
                  Bize Mesaj Gönderin
                </CardTitle>
                <CardDescription className="text-base">
                  Formu doldurun, en kısa sürede size geri dönüş yapalım.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-gray-600">
                      Teşekkürler! En kısa sürede size geri dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Adınızı girin"
                          className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="E-posta adresinizi girin"
                          className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Konu</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Mesaj konusu"
                        className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajınız *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detaylı mesajınızı buraya yazın..."
                        className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32] resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-3 text-lg transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Mesajı Gönder
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="border-2 border-[#E5AE32]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#E5AE32]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-[#E5AE32] font-medium">{info.details}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-2 border-[#E5AE32]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Clock className="mr-2 text-[#E5AE32]" size={24} />
                  Yanıt Süremiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Genel sorular:</span>
                    <span className="font-semibold text-[#E5AE32]">24 saat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teknik destek:</span>
                    <span className="font-semibold text-[#E5AE32]">48 saat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Takım desteği:</span>
                    <span className="font-semibold text-[#E5AE32]">72 saat</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-2 border-[#E5AE32]/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <MapPin className="mr-2 text-[#E5AE32]" size={24} />
                  Çalışma Saatleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pazartesi - Cuma:</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cumartesi:</span>
                    <span className="font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pazar:</span>
                    <span className="font-medium text-red-600">Kapalı</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    * Tüm saatler Türkiye saati (GMT+3) olarak verilmiştir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-1 h-8 bg-[#E5AE32] mr-4 rounded-full"></div>
            Sık Sorulan Sorular
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="border-2 hover:border-[#E5AE32]/50 transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {item.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;