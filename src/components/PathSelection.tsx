import React from 'react';
import { motion } from 'motion/react';
import { Play, BarChart2, MessageSquare, ArrowRight, BookOpen, Target, FileText, Rocket, Lock } from 'lucide-react';

interface PathSelectionProps {
  onSelectPath: (pathId: string) => void;
  onSelectUnit: (unitId: string) => void;
  onShowDashboard: () => void;
}

export const PathSelection: React.FC<PathSelectionProps> = ({ onSelectPath, onSelectUnit, onShowDashboard }) => {
  const [selectedMainPath, setSelectedMainPath] = React.useState<string | null>(null);
  const [selectedSubPath, setSelectedSubPath] = React.useState<string | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<string | null>(null);

  const paths = [
    {
      id: 'k12',
      title: 'Ôn thi chuyển cấp',
      description: 'Lộ trình bám sát đề thi vào 10 thực tế của 63 tỉnh thành.',
      tag: 'K12 SERIES',
      subTag: '3 LỘ TRÌNH',
      progress: 65,
      color: 'bg-blue-500',
      image: 'https://picsum.photos/seed/k12/400/200'
    },
    {
      id: 'gdpt',
      title: 'Chương trình GDPT',
      description: 'Học liệu bám sát sách giáo khoa mới của Bộ GD&ĐT.',
      tag: 'SCHOOL',
      progress: 40,
      color: 'bg-indigo-500',
      image: 'https://picsum.photos/seed/gdpt/400/200'
    },
    {
      id: 'cambridge',
      title: 'Cambridge A2-B1',
      description: 'Chứng chỉ quốc tế cho tiểu học và THCS.',
      tag: 'CERTIFICATE',
      progress: 85,
      color: 'bg-green-500',
      image: 'https://picsum.photos/seed/cambridge/400/200'
    },
    {
      id: 'ielts',
      title: 'IELTS Mastery',
      description: 'Nâng band thần tốc 4 kỹ năng Nghe - Nói - Đọc - Viết với AI.',
      tag: 'ACADEMIC',
      subTag: '4 LỘ TRÌNH',
      progress: 20,
      color: 'bg-yellow-500',
      image: 'https://picsum.photos/seed/ielts/400/200'
    },
    {
      id: 'writing-speaking',
      title: 'Ôn luyện chuyên sâu Writing - Speaking',
      description: 'Luyện tập chuyên sâu 2 kỹ năng khó nhất với phản hồi AI tức thì.',
      tag: 'INTENSIVE',
      progress: 10,
      color: 'bg-rose-500',
      image: 'https://picsum.photos/seed/ws/400/200'
    }
  ];

  const EXAM_SUB_PATHS = [
    { id: 'grade6', title: 'Thi vào lớp 6', description: 'Ôn tập kiến thức trọng tâm để thi vào các trường THCS chất lượng cao.', icon: '🎒', color: 'from-orange-400 to-orange-500' },
    { id: 'grade10', title: 'Thi vào lớp 10', description: 'Luyện đề và củng cố kiến thức thi vào các trường THPT công lập và chuyên.', icon: '🏫', color: 'from-sky-400 to-sky-500' },
    { id: 'highschool', title: 'Thi THPT Quốc gia', description: 'Lộ trình ôn thi toàn diện cho kỳ thi tốt nghiệp và xét tuyển Đại học.', icon: '🎓', color: 'from-indigo-500 to-indigo-600' },
  ];

  const IELTS_SUB_PATHS = [
    { id: 'pre', title: 'PRE-IELTS', description: 'Xây dựng nền tảng vững chắc về từ vựng và ngữ pháp cơ bản cho người mới bắt đầu.', icon: '🌱', color: 'from-green-400 to-green-500' },
    { id: '3-5', title: 'IELTS 3-5', description: 'Làm quen với cấu trúc đề thi và rèn luyện các kỹ năng cơ bản để đạt band 5.0.', icon: '🚀', color: 'from-yellow-400 to-yellow-500' },
    { id: '6-7', title: 'IELTS 6-7', description: 'Nâng cao kỹ năng làm bài, mở rộng vốn từ vựng học thuật để chinh phục band 7.0.', icon: '🎯', color: 'from-orange-400 to-orange-500' },
    { id: '7plus', title: 'IELTS 7+', description: 'Hoàn thiện kỹ năng, luyện tập các chủ đề khó để đạt band điểm xuất sắc 7.5+.', icon: '🏆', color: 'from-purple-500 to-purple-600' },
  ];

  const MODE_PATHS = [
    { id: 'basic', title: 'ÔN THI VÀO LỚP 6 CƠ BẢN', description: 'Nắm vững kiến thức nền tảng, bám sát chương trình sách giáo khoa.', icon: <BookOpen className="w-8 h-8" />, color: 'from-blue-400 to-blue-500' },
    { id: 'intermediate', title: 'ÔN THI VÀO LỚP 6 TRUNG CẤP', description: 'Mở rộng kiến thức, rèn luyện kỹ năng giải các dạng bài tập thông dụng.', icon: <Target className="w-8 h-8" />, color: 'from-emerald-400 to-emerald-500' },
    { id: 'advanced', title: 'ÔN THI VÀO LỚP 6 NÂNG CAO', description: 'Chinh phục các dạng bài khó, chuyên sâu để thi vào các trường chuyên.', icon: <Rocket className="w-8 h-8" />, color: 'from-purple-400 to-purple-500' },
  ];

  const TOPIC_PATHS = [
    { 
      id: 'module-1', 
      title: 'MODULE 1: Nền tảng từ vựng & phát âm', 
      description: 'Mục tiêu: Hiểu – đọc – nhận diện cơ bản', 
      microKnowledge: ['Alphabet & sounds (bảng chữ cái + âm cơ bản)', 'Numbers (1–100)', 'School vocabulary (đồ dùng học tập)', 'Family & daily objects', 'Pronunciation cơ bản (s/es, ending sounds)'],
      icon: '🌱', 
      color: 'from-green-400 to-green-500',
      locked: false 
    },
    { 
      id: 'module-2', 
      title: 'MODULE 2: Ngữ pháp nền (Core Grammar)', 
      description: 'Mục tiêu: Nắm cấu trúc quan trọng nhất', 
      microKnowledge: ['To be (am/is/are)', 'Thì hiện tại đơn (Present Simple)', 'Đại từ nhân xưng (I, you, he, she…)', 'Danh từ số ít / số nhiều', 'There is / There are', 'Giới từ cơ bản (in, on, under, next to)'],
      icon: '🧠', 
      color: 'from-blue-400 to-blue-500',
      locked: true 
    },
    { 
      id: 'module-3', 
      title: 'MODULE 3: Mẫu câu giao tiếp cơ bản', 
      description: 'Mục tiêu: Dùng được câu đơn', 
      microKnowledge: ['Giới thiệu bản thân', 'Hỏi – đáp thông tin cá nhân', 'Hỏi giờ / ngày', 'Nói về thói quen (daily routine)', 'Mô tả đồ vật / người'],
      icon: '💬', 
      color: 'from-yellow-400 to-yellow-500',
      locked: true 
    },
    { 
      id: 'module-4', 
      title: 'MODULE 4: Kỹ năng đọc – hiểu', 
      description: 'Mục tiêu: Làm được dạng bài đọc ngắn', 
      microKnowledge: ['Skimming (đọc ý chính)', 'Matching (nối thông tin)', 'True / False', 'Điền từ vào đoạn văn', 'Từ khóa (keywords)'],
      icon: '📖', 
      color: 'from-sky-400 to-sky-500',
      locked: true 
    },
    { 
      id: 'module-5', 
      title: 'MODULE 5: Viết câu & đoạn ngắn', 
      description: 'Mục tiêu: Viết đúng cấu trúc', 
      microKnowledge: ['Sắp xếp câu (sentence ordering)', 'Viết câu đơn đúng ngữ pháp', 'Viết đoạn 3–5 câu (giới thiệu bản thân)', 'Lỗi sai thường gặp (basic errors)'],
      icon: '✍️', 
      color: 'from-rose-400 to-rose-500',
      locked: true 
    },
    { 
      id: 'module-6', 
      title: 'MODULE 6: Luyện đề theo dạng bài', 
      description: 'Mục tiêu: Làm quen format thi lớp 6', 
      microKnowledge: ['Trắc nghiệm ngữ pháp', 'Điền từ', 'Chọn đáp án đúng', 'Đọc hiểu ngắn', 'Viết lại câu'],
      icon: '📝', 
      color: 'from-orange-400 to-orange-500',
      locked: true 
    },
    { 
      id: 'module-7', 
      title: 'MODULE 7: Đề tổng hợp & chữa đề', 
      description: 'Mục tiêu: Tăng tốc trước khi thi', 
      microKnowledge: ['Full test (đề hoàn chỉnh)', 'Chữa chi tiết từng câu', 'Phân tích lỗi sai', 'Tips làm bài nhanh'],
      icon: '🚀', 
      color: 'from-purple-400 to-purple-500',
      locked: true 
    },
  ];

  const handlePathClick = (pathId: string) => {
    if (pathId === 'k12' || pathId === 'ielts') {
      setSelectedMainPath(pathId);
      setSelectedSubPath(null);
      setSelectedMode(null);
    } else {
      onSelectPath(pathId);
    }
  };

  if (selectedMode === 'topics' && selectedSubPath === 'grade6') {
    return (
      <div className="pt-24 pb-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setSelectedMode(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Quay lại chọn lộ trình
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-800 mb-4 font-headline uppercase tracking-tight">Ôn tập chủ điểm</h1>
            <p className="text-slate-500 font-medium">Chọn chủ điểm bạn muốn học để bắt đầu ngay.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOPIC_PATHS.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group transition-all relative overflow-hidden ${topic.locked ? 'opacity-75 grayscale' : 'hover:border-blue-200'}`}
              >
                {topic.locked && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-slate-200`}>
                  {topic.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 font-headline tracking-tight uppercase">{topic.title}</h3>
                <p className="text-sm text-blue-500 font-bold mb-4">{topic.description}</p>
                
                <div className="space-y-2 mb-8 flex-grow">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">Kiến thức trọng tâm:</p>
                  {topic.microKnowledge.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  disabled={topic.locked}
                  onClick={() => onSelectUnit('unit-1')}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                    topic.locked 
                      ? 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-200'
                  }`}
                >
                  {topic.locked ? 'Đang khóa' : 'Học ngay'} {!topic.locked && <Play className="w-4 h-4 fill-current" />}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedSubPath === 'grade6') {
    return (
      <div className="pt-24 pb-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => setSelectedSubPath(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Quay lại chọn kỳ thi
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-800 mb-4 font-headline uppercase tracking-tight">Thi vào lớp 6</h1>
            <p className="text-slate-500 font-medium">Chọn lộ trình ôn thi phù hợp với trình độ của bạn để đạt kết quả tốt nhất.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MODE_PATHS.map((mode) => (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedMode('topics'); // For now, all levels lead to topic selection
                }}
                className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 text-center flex flex-col items-center group transition-all hover:border-blue-200 h-full"
              >
                <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${mode.color} flex items-center justify-center text-white mb-8 shadow-xl shadow-slate-200 group-hover:rotate-6 transition-transform`}>
                  {mode.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-4 font-headline tracking-tight">{mode.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">{mode.description}</p>
                <div className="mt-auto py-3 px-6 bg-slate-50 rounded-2xl text-blue-500 font-bold text-xs group-hover:bg-blue-500 group-hover:text-white transition-all uppercase tracking-widest">
                  Học ngay
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedMainPath === 'k12' || selectedMainPath === 'ielts') {
    const isIelts = selectedMainPath === 'ielts';
    const subPaths = isIelts ? IELTS_SUB_PATHS : EXAM_SUB_PATHS;
    const title = isIelts ? 'IELTS Mastery' : 'Ôn thi chuyển cấp';
    const description = isIelts 
      ? 'Chọn cấp độ phù hợp với mục tiêu band điểm của bạn để bắt đầu lộ trình học tập.'
      : 'Chọn kỳ thi bạn muốn chuẩn bị để bắt đầu lộ trình học tập cá nhân hóa.';

    return (
      <div className="pt-24 pb-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => setSelectedMainPath(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Quay lại chọn lộ trình chính
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-800 mb-4 font-headline uppercase tracking-tight">{title}</h1>
            <p className="text-slate-500 font-medium">{description}</p>
          </div>

          <div className={`grid grid-cols-1 ${isIelts ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
            {subPaths.map((sub) => (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (selectedMainPath === 'k12' && sub.id === 'grade6') {
                    setSelectedSubPath('grade6');
                  } else {
                    onSelectPath(`${selectedMainPath}-${sub.id}`);
                  }
                }}
                className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-left flex flex-col h-full group transition-all hover:border-sky-200"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                  {sub.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-3 font-headline uppercase tracking-tight">{sub.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{sub.description}</p>
                <div className="flex items-center text-sky-500 font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  Bắt đầu ngay <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-16 bg-indigo-50 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-indigo-100">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-sm shrink-0">
              💡
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-indigo-900 mb-3">Bạn chưa biết chọn gì?</h4>
              <p className="text-indigo-700/70 text-base leading-relaxed">
                Đừng lo lắng! Bạn có thể làm bài kiểm tra đánh giá năng lực miễn phí để chúng tôi gợi ý lộ trình phù hợp nhất với trình độ hiện tại của bạn.
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              Kiểm tra ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="bg-primary p-12 rounded-3xl text-white mb-12 relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <span className="bg-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
              Tài khoản Premium
            </span>
            <h1 className="text-4xl font-extrabold font-headline mb-4">Lộ trình học tập của bạn</h1>
            <p className="text-white/90 max-w-xl">
              Tiếp tục hành trình chinh phục tiếng Anh với lộ trình được cá nhân hóa dành riêng cho mục tiêu của bạn.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Play className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Bài học đang học</p>
              <p className="font-bold text-lg text-slate-800">4 Bài học</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
              🏅
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Thông thạo đạt được</p>
              <p className="font-bold text-lg text-slate-800">12 Badge</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              🔥
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Chuỗi ngày học tập</p>
              <p className="font-bold text-lg text-slate-800">15 Ngày</p>
            </div>
          </div>
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {paths.map((path, index) => (
            <motion.div 
              key={path.id}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col ${index === 4 ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''}`}
            >
              <div className="h-48 relative">
                <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {path.tag}
                  </span>
                  {path.subTag && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {path.subTag}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-lg mb-2 text-slate-800">{path.title}</h4>
                <p className="text-xs text-slate-400 mb-6 line-clamp-2">{path.description}</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                    <span>Tiến độ: {path.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-blue-400 rounded-full" 
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>

                  <button 
                    onClick={() => handlePathClick(path.id)}
                    className="w-full py-3 bg-blue-400 text-white rounded-xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                  >
                    Học tiếp <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-400 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xl shadow-blue-200/50">
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Báo cáo tuần</h3>
              <p className="text-white/80 mb-6 md:mb-0">
                Xem phân tích chi tiết kỹ năng và mức độ chuyên cần của bạn.
              </p>
            </div>
            <button 
              onClick={onShowDashboard}
              className="relative z-10 px-8 py-4 bg-white text-blue-500 hover:bg-blue-50 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Xem báo cáo chi tiết <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
