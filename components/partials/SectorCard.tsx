import { LucideIcon } from 'lucide-react';

interface SectorProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export default function SectorCard({ title, desc, icon: Icon }: SectorProps) {
  return (
    <>
      <div
        className="group relative p-10 border border-gray-100 transition-all duration-500 flex flex-col items-start overflow-hidden sector-card h-full justify-between"
      >
        {/* Icon lớn mờ ở góc */}
        <Icon className="absolute -right-6 -bottom-6 size-32 sector-icon-bg transition-all duration-700" />

        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Icon box */}
          <div className="mb-8 p-4 transition-colors duration-500 rounded-sm sector-icon-box w-fit">
            <Icon className="transition-colors duration-500 sector-icon" size={32} />
          </div>

          {/* Title */}
          <div className="min-h-[3rem] mb-4 flex items-center">
            <h3 className="text-lg font-black uppercase tracking-tighter transition-colors sector-title leading-tight">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed font-light transition-colors sector-desc text-justify grow">
            {desc}
          </p>

          {/* Bottom bar */}
          <div className="mt-8 h-1 bg-yellow-500 transition-all duration-500 sector-bar"></div>
        </div>
      </div>

      <style jsx>{`
        .sector-card {
          background-color: rgb(15, 23, 42); /* slate-900 for mobile */
        }
        .sector-icon-bg {
          color: rgba(255, 255, 255, 0.05);
        }
        .sector-icon-box {
          background-color: rgb(234, 179, 8); /* yellow-500 */
        }
        .sector-icon {
          color: white;
        }
        .sector-title {
          color: white;
        }
        .sector-desc {
          color: rgba(255, 255, 255, 0.7);
        }
        .sector-bar {
          width: 100%;
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .sector-card {
            background-color: white;
          }
          .sector-card:hover {
            background-color: rgb(15, 23, 42);
          }
          .sector-icon-bg {
            color: rgb(249, 250, 251); /* gray-50 */
          }
          .group:hover .sector-icon-bg {
            color: rgba(255, 255, 255, 0.05);
          }
          .sector-icon-box {
            background-color: rgb(254, 249, 195); /* yellow-100 */
          }
          .group:hover .sector-icon-box {
            background-color: rgb(234, 179, 8);
          }
          .sector-icon {
            color: rgb(234, 179, 8);
          }
          .group:hover .sector-icon {
            color: white;
          }
          .sector-title {
            color: rgb(15, 23, 42); /* slate-900 */
          }
          .group:hover .sector-title {
            color: white;
          }
          .sector-desc {
            color: rgb(107, 114, 128); /* gray-500 */
          }
          .group:hover .sector-desc {
            color: rgba(255, 255, 255, 0.7);
          }
          .sector-bar {
            width: 2rem; /* w-8 */
          }
          .group:hover .sector-bar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}