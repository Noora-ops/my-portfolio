import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
  X,
  Plus,
  LineChart,
  ClipboardList,
  Globe,
  Award
} from 'lucide-react';

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // 项目数据
  const projects = [
    {
      id: "01",
      title: "梅州客天下：全链路营销策略优化",
      role: "项目负责人 / 策略策划",
      tags: ["SICAS模型", "SPSS数据驱动", "全链路设计"],
      description: "针对传统景区客群老化痛点，通过370+份问卷深度分析，重构从用户感知到分享的闭环体验。",
      strategy: "基于SICAS模型锁定“互动断层”痛点，通过数字化样机优化触达路径，以品牌内容驱动用户自发分享。针对18-35岁核心消费群体进行精准画像，提出“数字化+沉浸感”的转型方案。",
      result: "获得导师高度认可，小程序设计方案被评为优秀案例（答辩前10%），体现了从数据洞察到视觉落地的闭环能力。",
      imageText: "景区全链路优化方案图示"
    },
    {
      id: "02",
      title: "“剧本杀+文旅”沉浸式调研策划",
      role: "项目组长 / 数据洞察",
      tags: ["聚类分析", "人群画像", "创意汇报"],
      description: "主导“文旅+剧本杀”调研。通过SPSS对431份样本进行聚类分析，精准划分三类动机人群。",
      strategy: "将枯燥数据转化为剧本演绎。通过SPSS提炼社交型、实用型、内向型人群特征。创新地将调研结论与剧本杀形式结合，策划沉浸式期末汇报。",
      result: "期末汇报获专业课第一。验证了在复杂文旅场景下，通过数据精准定位受众并进行创意表达的实战价值。",
      imageText: "SPSS聚类分析与人群画像模型"
    },
    {
      id: "03",
      title: "自媒体运营：小红书游戏博主",
      role: "主创 / 全流程运营",
      tags: ["0-1起号", "内容调优", "算法洞察"],
      description: "在冷启动环境下，通过爆款拆解与动态数据迭代，两个月内实现粉丝增长率455%。",
      strategy: "前期通过模仿热点快速切入，后期基于后台画像进行内容洗粉。通过封面AB测试与脚本节奏优化，建立高粘性粉丝群。",
      result: "成功跑通小红书垂类起号链路，实现粉丝增长率455%，完播率提高13%，获赞藏1000+。",
      imageText: "小红书账号运营数据后台"
    }
  ];

  // 粒子背景逻辑
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];
    const particleCount = 80;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.8 ? '#3b82f6' : '#cbd5e1'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - dist) / 150;
            p.x += Math.cos(angle) * force * 1.2;
            p.y += Math.sin(angle) * force * 1.2;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize(); init(); animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* 首屏 */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 text-center px-6">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter">
            ZHANG <span className="text-blue-600">YUTING</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg font-mono tracking-widest uppercase">
            Creative Branding & Data Insight
          </p>
          <div className="pt-12">
            <button 
              onClick={() => setShowAbout(true)}
              className="group px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 flex items-center gap-3 mx-auto"
            >
              ABOUT ME / 关于我
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce opacity-20">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* 关于我侧边栏 */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${showAbout ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${showAbout ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowAbout(false)} />
        <div className={`absolute right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${showAbout ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white z-10">
            <h2 className="text-xl font-bold tracking-tight">ABOUT ME</h2>
            <button onClick={() => setShowAbout(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-10 space-y-12 pb-20">
            <section>
              <h3 className="text-sm font-mono text-blue-600 mb-8 uppercase tracking-widest border-l-4 border-blue-600 pl-4 font-bold">核心优势 / Strengths</h3>
              <div className="space-y-10">
                {[
                  { 
                    icon: <Target size={18}/>, 
                    title: "市场调研与用户洞察", 
                    desc: "独立设计问卷、深度访谈、SPSS数据分析，精准挖掘用户需求与市场痛点。" 
                  },
                  { 
                    icon: <ClipboardList size={18}/>, 
                    title: "策略制定与方案输出", 
                    desc: "熟练运用STP、4Ps、SICAS、波特五力等模型，完成全链路策略规划与方案撰写。" 
                  },
                  { 
                    icon: <LineChart size={18}/>, 
                    title: "数据分析与效果优化", 
                    desc: "基于用户行为数据、内容数据进行深度分析，驱动策略迭代与效果提升。" 
                  },
                  { 
                    icon: <Globe size={18}/>, 
                    title: "平台内容策划", 
                    desc: "熟悉小红书、B站平台规则与用户偏好，具备从0到1的内容策划与运营经验。" 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-600 group-hover:text-white">{item.icon}</div>
                    <div>
                      <h4 className="font-bold mb-2 text-slate-800">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-mono text-blue-600 mb-4 uppercase tracking-widest border-l-4 border-blue-600 pl-4 font-bold">个人简介 / Bio</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                我是张雨婷，一名市场营销专业的毕业生。拥有超过一年的职场实操经验，我不满足于碎片化的创意，更倾向于通过严谨的市场调研与数据分析，寻找品牌增长的底层逻辑。在黑兔化妆品担任市场营销助理的工作经历中，我深入理解了品牌如何在大促节点通过内容调优实现爆文增长。多项主导调研项目磨练了我作为项目负责人的统筹与表达能力。GPA 4.13 的成绩证明了我的专业深度，而持续的自媒体实战则保持了我的市场敏感度。
              </p>
            </section>

            <section className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600 font-mono">
                <Mail size={16} className="text-blue-600" /> noora0820@163.com
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600 font-mono">
                <Phone size={16} className="text-blue-600" /> 17817937106
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 作品集展示 */}
      <section className="max-w-7xl mx-auto px-6 py-32 z-10 relative">
        <div className="mb-24">
          <h2 className="text-4xl font-bold tracking-tight">SELECTED PROJECTS</h2>
          <div className="w-12 h-1 bg-blue-600 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500">
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs italic px-10 text-center relative overflow-hidden">
                [ {project.imageText} ]
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-4xl font-black text-gray-100 font-mono">{project.id}</span>
                  <div className="flex gap-2">
                    {project.tags.slice(0,2).map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-1 bg-gray-50 text-gray-400 rounded-md uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-4 border border-black rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-all duration-300"
                >
                  VIEW DETAIL / 深度查看
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 项目详情弹窗 */}
      {selectedProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden relative z-20 flex flex-col">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full z-10 transition-colors">
              <X size={24} />
            </button>
            
            <div className="overflow-y-auto p-10 md:p-16">
              <div className="mb-12">
                <span className="text-blue-600 font-mono text-sm tracking-widest mb-4 block uppercase font-bold">{selectedProject.role}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-4 py-2 bg-gray-100 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-10 bg-blue-50/50 rounded-[32px] border border-blue-100/50">
                  <div className="flex items-center gap-3 mb-6 text-blue-600 font-bold uppercase text-sm tracking-widest">
                    <Target size={18} /> 策划核心思维
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedProject.strategy}
                  </p>
                </div>
                
                <div className="p-10 bg-black text-white rounded-[32px]">
                  <div className="flex items-center gap-3 mb-6 text-blue-400 font-bold uppercase text-sm tracking-widest">
                    <Award size={18} /> 项目成果
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {selectedProject.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部 */}
      <footer className="py-32 text-center border-t border-gray-50 relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 tracking-tight text-slate-800">用专业数据和深度洞察，为品牌寻找确定性增长。</h3>
          <p className="text-sm text-gray-400 mb-12 font-mono">© 2026 ZHANG YUTING | DATA-DRIVEN BRAND PLANNER</p>
          <div className="flex justify-center gap-6">
             <a href="mailto:noora0820@163.com" className="p-4 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-xl hover:scale-110 transition-all text-gray-500 hover:text-blue-600"><Mail size={20} /></a>
             <div className="p-4 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-xl hover:scale-110 transition-all text-gray-500 hover:text-blue-600 cursor-pointer"><Phone size={20} /></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
