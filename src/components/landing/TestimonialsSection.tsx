
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';

type TestimonialProps = {
  content: string;
  name: string;
  title: string;
  image: string;
  imageFallback: string;
};

const Testimonial: React.FC<TestimonialProps> = ({ content, name, title, image, imageFallback }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
      {content}
    </p>
    <div className="flex items-center">
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={image} />
        <AvatarFallback>{imageFallback}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-medium dark:text-white">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const testimonials = {
    en: [
      {
        content: "Muwakkil has been a game-changer for our startup. We've saved thousands of dirhams in legal fees while ensuring our contracts are fully compliant.",
        name: "Sarah Al Mansouri",
        title: "CEO, TechStart UAE",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=120&h=120",
        imageFallback: "SA"
      },
      {
        content: "The document review feature caught several non-compliant clauses that could have caused us problems later. Highly recommend for any business in UAE.",
        name: "Ahmed Hassan",
        title: "Legal Director, GrowFast",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=120&h=120",
        imageFallback: "AH"
      },
      {
        content: "As someone new to UAE business laws, Muwakkil has been my go-to resource. The AI assistant answers my questions accurately and in plain language.",
        name: "Emma Parker",
        title: "Founder, ExpatsConnect",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120",
        imageFallback: "EP"
      }
    ],
    ar: [
      {
        content: "كان موكل بمثابة نقلة نوعية لشركتنا الناشئة. لقد وفرنا آلاف الدراهم في الرسوم القانونية مع ضمان امتثال عقودنا بالكامل.",
        name: "سارة المنصوري",
        title: "الرئيس التنفيذي، تيك ستارت الإمارات",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=120&h=120",
        imageFallback: "سم"
      },
      {
        content: "اكتشفت ميزة مراجعة المستندات العديد من البنود غير المتوافقة التي كان يمكن أن تسبب لنا مشاكل لاحقًا. أنصح به بشدة لأي شركة في الإمارات.",
        name: "أحمد حسن",
        title: "المدير القانوني، جروفاست",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=120&h=120",
        imageFallback: "أح"
      },
      {
        content: "كشخص جديد على قوانين الأعمال الإماراتية، كان موكل مرجعي المفضل. يجيب المساعد الذكي على أسئلتي بدقة وبلغة واضحة.",
        name: "إيما باركر",
        title: "مؤسس، إكسباتس كونيكت",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120",
        imageFallback: "إب"
      }
    ]
  };

  const currentTestimonials = i18n.language === 'ar' ? testimonials.ar : testimonials.en;

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">
          {i18n.language === 'ar' ? 'ما يقوله عملاؤنا' : 'What Our Customers Say'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
              imageFallback={testimonial.imageFallback}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
