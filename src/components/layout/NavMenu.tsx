import { memo, useCallback, useState, useSyncExternalStore, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle, ArrowRight, Award, BookOpen, Brain, Building2, ChartBar, Check,
  ChevronDown, ChevronRight, Compass, Database, History, Info, Instagram, Library,
  Link as LinkIcon, List, Map, Menu, Search, Shield, Sparkles, Target, X, AtSign,
} from 'lucide-react';

export type NavMenuModalId =
  | 'schoolTypes'
  | 'mockVolunteer'
  | 'strategy'
  | 'gradeLevel'
  | 'historicalStats'
  | 'importantDates'
  | 'disclaimer'
  | 'instructions'
  | 'advantages'
  | 'rating'
  | 'changelog'
  | 'privacy'
  | 'terms'
  | 'reportError'
  | 'scoreInquiry';

export type NavMenuAction =
  | { type: 'holland' }
  | { type: 'encyclopedia' }
  | { type: 'modal'; id: NavMenuModalId };

type IconType = ComponentType<{ className?: string }>;

type ActionItem = {
  kind: 'action';
  key: string;
  label: string;
  icon: IconType;
  color: string;
  bg: string;
  action: NavMenuAction;
  buttonClass?: string;
};

type LinkItem = {
  kind: 'link';
  key: string;
  label: string;
  href: string;
  icon: IconType;
  color: string;
  bg: string;
};

type MenuItem = ActionItem | LinkItem;

type MenuSection = {
  id: string;
  title: string;
  headerClass: string;
  iconWrapClass: string;
  icon: IconType;
  iconClass: string;
  items: MenuItem[];
};

const ACTION_ITEM_CLASS =
  'w-full text-left px-4 py-3.5 rounded-xl border-2 border-transparent hover:border-slate-900 hover:bg-slate-50 flex items-center justify-between group active:scale-95 transition-all';

const LINK_ITEM_CLASS =
  'w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 border-transparent hover:border-slate-900 hover:bg-slate-50 group active:scale-95 transition-all';

const SCORE_ITEM_CLASS =
  'w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 border-transparent hover:border-slate-900 hover:bg-slate-50 group active:scale-95 transition-all outline-none';

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const SECTIONS: MenuSection[] = [
  {
    id: 'schoolDetails',
    title: '學校與科系探索',
    headerClass: 'bg-sky-50 hover:bg-sky-100',
    iconWrapClass: 'bg-sky-200',
    icon: Compass,
    iconClass: 'text-sky-700',
    items: [
      { kind: 'action', key: 'holland', label: '荷倫碼性向測驗', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', action: { type: 'holland' } },
      { kind: 'action', key: 'encyclopedia', label: '職群科系百科', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-100', action: { type: 'encyclopedia' } },
      { kind: 'action', key: 'schoolTypes', label: '學校類型解析', icon: Building2, color: 'text-sky-600', bg: 'bg-sky-100', action: { type: 'modal', id: 'schoolTypes' } },
    ],
  },
  {
    id: 'strategy',
    title: '志願選填與落點',
    headerClass: 'bg-amber-50 hover:bg-amber-100',
    iconWrapClass: 'bg-amber-200',
    icon: Target,
    iconClass: 'text-amber-700',
    items: [
      { kind: 'action', key: 'mockVolunteer', label: '模擬志願選填', icon: Target, color: 'text-sky-600', bg: 'bg-sky-100', action: { type: 'modal', id: 'mockVolunteer' } },
      { kind: 'action', key: 'strategy', label: '志願選填攻略', icon: Target, color: 'text-amber-600', bg: 'bg-amber-100', action: { type: 'modal', id: 'strategy' } },
      { kind: 'action', key: 'gradeLevel', label: '等級對照表', icon: Award, color: 'text-rose-600', bg: 'bg-rose-100', action: { type: 'modal', id: 'gradeLevel' } },
      { kind: 'action', key: 'historicalStats', label: '歷年會考統計', icon: ChartBar, color: 'text-indigo-600', bg: 'bg-indigo-100', action: { type: 'modal', id: 'historicalStats' } },
      { kind: 'action', key: 'importantDates', label: '重要日程', icon: Map, color: 'text-purple-600', bg: 'bg-purple-100', action: { type: 'modal', id: 'importantDates' } },
      { kind: 'action', key: 'disclaimer', label: '免責聲明', icon: Shield, color: 'text-slate-600', bg: 'bg-slate-100', action: { type: 'modal', id: 'disclaimer' } },
    ],
  },
  {
    id: 'systemGuide',
    title: '系統指南與回饋',
    headerClass: 'bg-indigo-50 hover:bg-indigo-100',
    iconWrapClass: 'bg-indigo-200',
    icon: Sparkles,
    iconClass: 'text-indigo-700',
    items: [
      { kind: 'action', key: 'instructions', label: '使用說明', icon: Info, color: 'text-blue-600', bg: 'bg-blue-100', action: { type: 'modal', id: 'instructions' } },
      { kind: 'action', key: 'advantages', label: '系統優點', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-100', action: { type: 'modal', id: 'advantages' } },
      { kind: 'action', key: 'rating', label: '評分系統', icon: StarIcon, color: 'text-amber-500', bg: 'bg-amber-100', action: { type: 'modal', id: 'rating' } },
      { kind: 'action', key: 'changelog', label: '更新日誌', icon: History, color: 'text-slate-500', bg: 'bg-slate-100', action: { type: 'modal', id: 'changelog' } },
      { kind: 'action', key: 'privacy', label: '隱私權政策', icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-100', action: { type: 'modal', id: 'privacy' } },
      { kind: 'action', key: 'terms', label: '服務條款', icon: Shield, color: 'text-slate-600', bg: 'bg-slate-100', action: { type: 'modal', id: 'terms' } },
      { kind: 'action', key: 'reportError', label: '錯誤回報', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100', action: { type: 'modal', id: 'reportError' } },
    ],
  },
  {
    id: 'externalLinks',
    title: '外部資源與分享',
    headerClass: 'bg-emerald-50 hover:bg-emerald-100',
    iconWrapClass: 'bg-emerald-200',
    icon: LinkIcon,
    iconClass: 'text-emerald-700',
    items: [
      { kind: 'action', key: 'scoreInquiry', label: '會考成績查詢', icon: Search, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', buttonClass: SCORE_ITEM_CLASS, action: { type: 'modal', id: 'scoreInquiry' } },
      { kind: 'link', key: 'volunteer', label: '序位查詢', href: 'https://tyctw.github.io/volunteer/', icon: ChartBar, color: 'text-orange-600', bg: 'bg-orange-100' },
      { kind: 'link', key: 'shared', label: '全國錄取分享', href: 'https://tyctw.github.io/shared/', icon: Library, color: 'text-indigo-600', bg: 'bg-indigo-100' },
      { kind: 'link', key: 'score', label: '全國序位分享', href: 'https://tyctw.github.io/score/', icon: List, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ],
  },
];

// Open state stays outside App so the drawer does not re-render the page.
const listeners = new Set<() => void>();
let isNavMenuOpen = false;

function emitNavMenu() {
  listeners.forEach((listener) => listener());
}

export function openNavMenu() {
  if (isNavMenuOpen) return;
  isNavMenuOpen = true;
  emitNavMenu();
}

export function closeNavMenu() {
  if (!isNavMenuOpen) return;
  isNavMenuOpen = false;
  emitNavMenu();
}

function subscribeNavMenu(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getNavMenuSnapshot() {
  return isNavMenuOpen;
}

function getNavMenuServerSnapshot() {
  return false;
}

const DrawerHeader = memo(function DrawerHeader() {
  return (
    <div className="p-5 bg-amber-400 border-b-4 border-slate-900 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-slate-900" />
        <h2 id="main-nav-title" className="text-2xl font-black text-slate-900 tracking-tight">主選單</h2>
      </div>
      <button
        type="button"
        onClick={closeNavMenu}
        aria-label="關閉主選單"
        className="w-10 h-10 bg-white flex items-center justify-center border-4 border-slate-900 rounded-xl hover:bg-slate-100 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:shadow-none"
      >
        <X className="w-6 h-6 text-slate-900" />
      </button>
    </div>
  );
});

const SocialLinks = memo(function SocialLinks() {
  return (
    <div className="bg-white rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-4 flex justify-center gap-4">
      <a href="https://www.instagram.com/115.rcpet/" target="_blank" rel="noreferrer" className="flex items-center gap-2 group outline-none">
        <div className="w-10 h-10 rounded-xl bg-pink-50 border-2 border-slate-900 flex items-center justify-center group-hover:bg-pink-100 group-hover:scale-110 active:scale-95 transition-all text-pink-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <Instagram className="w-5 h-5 group-hover:-rotate-6 transition-transform group-hover:rotate-0" />
        </div>
        <span className="font-bold text-slate-700 text-sm">Instagram</span>
      </a>
      <div className="w-0.5 h-10 bg-slate-200 rounded-full mx-2"></div>
      <a href="https://www.threads.com/@115.rcpet" target="_blank" rel="noreferrer" className="flex items-center gap-2 group outline-none">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 active:scale-95 transition-all text-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <AtSign className="w-5 h-5 group-hover:rotate-6 transition-transform group-hover:rotate-0" />
        </div>
        <span className="font-bold text-slate-700 text-sm">Threads</span>
      </a>
    </div>
  );
});

const DrawerFooter = memo(function DrawerFooter() {
  return (
    <div className="p-4 bg-slate-900 border-t-4 border-slate-900 text-center">
      <p className="text-slate-400 font-bold text-xs flex items-center justify-center gap-1">
        <Check className="w-3 h-3 text-emerald-400" />
        會考落點分析系統 v5.0
      </p>
    </div>
  );
});

const NavSection = memo(function NavSection({
  section,
  expanded,
  onToggle,
  onAction,
}: {
  section: MenuSection;
  expanded: boolean;
  onToggle: (id: string) => void;
  onAction: (action: NavMenuAction) => void;
}) {
  const SectionIcon = section.icon;

  return (
    <div className="bg-white rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => onToggle(section.id)}
        className={`w-full flex items-center justify-between p-4 outline-none transition-colors ${section.headerClass}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${section.iconWrapClass}`}>
            <SectionIcon className={`w-5 h-5 ${section.iconClass}`} />
          </div>
          <span className="font-black text-slate-900 text-lg">{section.title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-900 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <div className="menu-accordion" data-open={expanded ? 'true' : 'false'}>
        <div className={`menu-accordion-panel${expanded ? '' : ' pointer-events-none'}`} inert={!expanded}>
          <div className="border-t-4 border-slate-900 bg-white">
            <div className="p-3 flex flex-col gap-2">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                if (item.kind === 'link') {
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={LINK_ITEM_CLASS}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border-2 border-slate-900 ${item.bg}`}>
                          <ItemIcon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="font-bold text-slate-900">{item.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </a>
                  );
                }

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      closeNavMenu();
                      onAction(item.action);
                    }}
                    className={item.buttonClass ?? ACTION_ITEM_CLASS}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border-2 border-slate-900 ${item.bg}`}>
                        <ItemIcon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="font-bold text-slate-900">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const NavMenuButton = memo(function NavMenuButton({
  className,
  iconClassName,
}: {
  className: string;
  iconClassName: string;
}) {
  const isOpen = useSyncExternalStore(subscribeNavMenu, getNavMenuSnapshot, getNavMenuServerSnapshot);

  return (
    <button
      type="button"
      onClick={openNavMenu}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="main-nav-drawer"
      aria-label="主選單"
      className={className}
    >
      <Menu className={iconClassName} />
    </button>
  );
});

function NavMenu({ onAction }: { onAction: (action: NavMenuAction) => void }) {
  const isOpen = useSyncExternalStore(subscribeNavMenu, getNavMenuSnapshot, getNavMenuServerSnapshot);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('schoolDetails');
  const onToggle = useCallback((id: string) => {
    setExpandedCategory((current) => (current === id ? null : id));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNavMenu}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            id="main-nav-drawer"
            role="dialog"
            aria-labelledby="main-nav-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[380px] max-w-full border-l-4 border-slate-900 bg-slate-50 shadow-[-8px_0px_0px_0px_rgba(15,23,42,0.1)] z-[110] flex flex-col overflow-hidden"
          >
            <DrawerHeader />
            <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar p-6 space-y-4">
              {SECTIONS.map((section) => (
                <NavSection
                  key={section.id}
                  section={section}
                  expanded={expandedCategory === section.id}
                  onToggle={onToggle}
                  onAction={onAction}
                />
              ))}
              <SocialLinks />
            </div>
            <DrawerFooter />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(NavMenu);
