import React from 'react';
import { BookOpen, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold font-headline text-primary mb-6"
          >
            Chào mừng bạn đến với Học cùng IOE!
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Chọn chế độ học tập để bắt đầu hành trình chinh phục tiếng Anh theo cách của riêng bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-primary-container flex flex-col items-start"
          >
            <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-secondary mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-headline mb-4 text-slate-800">Ôn tự do</h3>
            <p className="text-slate-500 mb-8">Khám phá kho tàng kiến thức không giới hạn. Tự chọn chủ đề, bài tập và tốc độ học tập phù hợp với sở thích của bạn.</p>
            <ul className="space-y-3 mb-10 text-sm text-slate-500">
              <li className="flex items-center gap-2">✨ Không giới hạn thời gian</li>
              <li className="flex items-center gap-2">✨ Tự chọn cấp độ học tập</li>
            </ul>
            <button className="w-full py-4 bg-slate-50 text-slate-300 rounded-2xl font-bold cursor-not-allowed">Bắt đầu ôn tập</button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-light flex flex-col items-start relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-orange-400 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Đề xuất</div>
            <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center text-primary mb-6">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-headline mb-4 text-slate-800">Ôn theo lộ trình</h3>
            <p className="text-slate-500 mb-8">Hành trình học tập được cá nhân hóa bởi AI. Theo dõi tiến độ chi tiết và đạt mục tiêu thi IOE với lộ trình bài bản nhất.</p>
            <ul className="space-y-3 mb-10 text-sm text-slate-500">
              <li className="flex items-center gap-2">🚀 Lộ trình chuẩn bộ Giáo dục</li>
              <li className="flex items-center gap-2">🚀 Phân tích điểm yếu qua mỗi bài thi</li>
            </ul>
            <button 
              onClick={onStart}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              KHÁM PHÁ LỘ TRÌNH CỦA TÔI <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <div className="bg-primary-container/30 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold font-headline mb-6 text-primary">Công nghệ dẫn lối tri thức</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Chúng tôi kết hợp phương pháp giáo dục truyền thống với AI hiện đại để tạo ra một môi trường học tiếng Anh đầy hứng khởi và hiệu quả cho học sinh Việt Nam.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-bold text-primary">1M+</p>
                <p className="text-xs text-slate-400 uppercase font-bold">Học sinh</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">500k+</p>
                <p className="text-xs text-slate-400 uppercase font-bold">Bài tập</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img src="https://picsum.photos/seed/tech/600/400" alt="Tech" className="rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
