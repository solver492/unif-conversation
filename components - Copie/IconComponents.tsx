
import React from 'react';

// FIX: Accept and apply style prop to the underlying SVG for flexible styling.
export const IconWrapper = ({ children, className, style }: { children?: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} style={style}>
        {children}
    </svg>
);

export const DashboardIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v11.5A2.25 2.25 0 0115.75 18H4.25A2.25 2.25 0 012 15.75V4.25zM6 6a1 1 0 00-1 1v6a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1H6zm5 0a1 1 0 00-1 1v6a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1h-1z" /></IconWrapper>
);
export const ConversationsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 2c-4.418 0-8 3.134-8 7 0 2.643 1.53 4.933 3.765 6.184l-1.31 3.424a.75.75 0 001.114.825l3.52-2.112A9.558 9.558 0 0010 18c4.418 0 8-3.134 8-7s-3.582-7-8-7zM5 10a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm4 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></IconWrapper>
);
export const BotIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.39 6.39a.75.75 0 011.06 0l2.122 2.121.03-.03a.75.75 0 011.06 0l2.122 2.121a.75.75 0 01-1.06 1.06L10 9.56l-2.121 2.122a.75.75 0 01-1.06-1.061l2.121-2.122-.03.03a.75.75 0 010-1.06L6.39 6.39z" clipRule="evenodd" /></IconWrapper>
);
export const MediaIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M1.5 3A1.5 1.5 0 013 1.5h14A1.5 1.5 0 0118.5 3v14a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 17V3zM3 3v1.233c.38.111.728.283 1.05.512l3.45 2.3a1.5 1.5 0 001.5 0l3.45-2.3a2.55 2.55 0 011.05-.512V3H3zm14 1.233a2.55 2.55 0 00-1.05.512l-3.45 2.3a1.5 1.5 0 01-1.5 0l-3.45-2.3A2.55 2.55 0 003 4.233V17h14V4.233z" clipRule="evenodd" /></IconWrapper>
);
export const AnalyticsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M11 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM7.5 7a.5.5 0 00-1 0v8a.5.5 0 001 0v-8zm4-2.5a.5.5 0 00-1 0v10a.5.5 0 001 0v-10zM4.5 9a.5.5 0 00-1 0v6a.5.5 0 001 0v-6z" /><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h11A2.5 2.5 0 0118 2.5v15A2.5 2.5 0 0115.5 20h-11A2.5 2.5 0 012 17.5v-15zm1 0V17.5a1.5 1.5 0 001.5 1.5h11a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5h-11a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" /></IconWrapper>
);
export const SettingsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M11.09 3.562A1.75 1.75 0 0114 4.095l.088-.035c.441-.176.953.043 1.13.484l.003.007c.176.441-.044.953-.485 1.13l-.007.003-.088.035a1.75 1.75 0 01-1.094 2.332c-.54.215-.92.735-1.025 1.298l-.003.02a1.75 1.75 0 01-3.116 0l-.003-.02c-.105-.563-.485-1.083-1.025-1.298a1.75 1.75 0 01-1.094-2.332l-.088-.035-.007-.003c-.441-.176-.66-.688-.484-1.13l.007-.003c.176-.441.689-.66 1.13-.484l.035.007.088.035a1.75 1.75 0 012.91-1.627V3.562zM9.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" /><path d="M6.331 11.043c.215-.54.735-.92 1.298-1.025l.02-.003a1.75 1.75 0 012.332-1.094l.035.088.003.007c.176.441.688.66 1.13.484l-.003-.007c.441-.176.66-.689.484-1.13l-.007-.003a1.75 1.75 0 01-1.627-2.91l-.035.088c-.176.441-.689.66-1.13.485l-.007-.003-.035-.088a1.75 1.75 0 01-2.332-1.094c-.215-.54-.735-.92-1.298-1.025l-.02-.003a1.75 1.75 0 010 3.116l.02.003c.563.105 1.083.485 1.298 1.025a1.75 1.75 0 01-1.094 2.332l-.088.035c-.441.176-.66.689-.484 1.13l.007.003c.176.441.689.66 1.13.484l.003-.007.088-.035c.783-.313 1.7-.07 2.332 1.094z" /><path d="M11.957 13.669c.54.215 1.06.596 1.275 1.159a1.75 1.75 0 01-1.094 2.332l-.088.035-.007.003c-.441.176-.953-.044-1.13-.485l-.003-.007-.088-.035a1.75 1.75 0 01-2.332-1.094c-.215-.54-.735-.92-1.298-1.025l-.02-.003a1.75 1.75 0 010-3.116l.02-.003c.563-.105 1.083-.485 1.298-1.025a1.75 1.75 0 012.332-1.094l.088.035c.441.176.66.689.484 1.13l-.007.003a1.75 1.75 0 011.627 2.91l-.035.088c.176.441.689.66 1.13.485l.007-.003.035-.088a1.75 1.75 0 011.094 2.332c.215.54.735.92 1.298 1.025l.02.003a1.75 1.75 0 010 3.116l-.02.003c-.563.105-1.083.485-1.298 1.025a1.75 1.75 0 01-2.332 1.094l-.088-.035c-.441-.176-.66-.688-.484-1.13l.007-.003a1.75 1.75 0 01-1.627-2.91l.035-.088a1.75 1.75 0 01-1.094-2.332z" /></IconWrapper>
);
export const SearchIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" /></IconWrapper>
);
export const ChevronDownIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></IconWrapper>
);
export const PhoneIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.298-.083.465a7.48 7.48 0 003.429 3.429c.167.081.364.052.465-.083l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V17a3 3 0 01-3 3h-2.25C6.012 20 2 15.988 2 9.25V7.5A2.5 2.5 0 014.5 5H6a.5.5 0 010-1H4.5A2.5 2.5 0 002 6.5V17a9.5 9.5 0 009.5 9.5h2.25a.5.5 0 00.5-.5v-2.121a.5.5 0 00-.28-.447l-4.423-1.105a.875.875 0 01-.323-.912l1.293-.97a.5.5 0 00.083-.465 9 9 0 01-4.12-4.12 .5.5 0 00-.465-.083l-.97 1.293a.875.875 0 01-.912-.323L4.28 4.717a.5.5 0 00-.447-.28H2.5a.5.5 0 00-.5.5v2z" clipRule="evenodd" /></IconWrapper>
);
export const VideoCameraIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M10 4a2 2 0 100 4 2 2 0 000-4z" /><path fillRule="evenodd" d="M2 5.25A3.25 3.25 0 015.25 2h9.5A3.25 3.25 0 0118 5.25v9.5A3.25 3.25 0 0114.75 18h-9.5A3.25 3.25 0 012 14.75v-9.5zm3.25-1.5a1.75 1.75 0 00-1.75 1.75v9.5c0 .966.784 1.75 1.75 1.75h9.5A1.75 1.75 0 0016.5 14.75v-9.5A1.75 1.75 0 0014.75 3.75h-9.5z" clipRule="evenodd" /><path d="M10 6a1 1 0 100 2 1 1 0 000-2z" /></IconWrapper>
);
export const EllipsisVerticalIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M10 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" /></IconWrapper>
);
export const ArrowPathIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M15.312 11.342a1.25 1.25 0 01-1.651-1.852l1.18-1.058a.75.75 0 00-1.06-1.06l-1.18 1.058a3.25 3.25 0 004.292 4.814l-1.581 1.581a.75.75 0 101.06 1.06l1.58-1.581a5.25 5.25 0 00-7.424-7.424l-1.58 1.58a.75.75 0 101.06 1.061l1.58-1.58a3.25 3.25 0 004.292 4.814zM4.688 8.658a1.25 1.25 0 011.651 1.852l-1.18 1.058a.75.75 0 001.06 1.06l1.18-1.058a3.25 3.25 0 00-4.292-4.814l1.581-1.581a.75.75 0 10-1.06-1.06l-1.58 1.581a5.25 5.25 0 007.424 7.424l1.58-1.58a.75.75 0 10-1.06-1.061l-1.58 1.58a3.25 3.25 0 00-4.292-4.814z" clipRule="evenodd" /></IconWrapper>
);
export const ChevronRightIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" /></IconWrapper>
);
export const PaperClipIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M15.28 4.47a.75.75 0 011.06 0l2.5 2.5a.75.75 0 010 1.06l-8.5 8.5a3.5 3.5 0 01-4.95-4.95l8.5-8.5a2 2 0 112.83 2.83l-6.5 6.5a.75.75 0 01-1.06-1.06l6.5-6.5a.5.5 0 00-.71-.71l-8.5 8.5a2 2 0 000 2.83l.5.5a2 2 0 002.83 0l8.5-8.5z" clipRule="evenodd" /></IconWrapper>
);
export const PaperAirplaneIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M3.105 3.105a.75.75 0 01.884-.043l11.998 8.248a.75.75 0 010 1.378l-11.997 8.248a.75.75 0 01-1.255-.916l1.677-5.18a.75.75 0 01.31-.41l5.416-3.754a.75.75 0 000-1.248L5.05 5.64a.75.75 0 01-.31-.41L3.065 4.062a.75.75 0 01.04-1.002z" /></IconWrapper>
);
export const PaperAirplaneIconAlt = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M10 18.25a.75.75 0 01-.75-.75V9.783l-4.94 3.407a.75.75 0 01-1.012-1.114l5.423-7.457a.75.75 0 011.45.002l5.422 7.457a.75.75 0 01-1.012 1.114l-4.94-3.407v7.717a.75.75 0 01-.75.75z" /></IconWrapper>
);
export const PlusCircleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" /></IconWrapper>
);
export const PencilIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.24-1.24l1-3a1 1 0 01.242-.39l9-9zM14 4.414L15.586 6 6 15.586 4.414 14 14 4.414z" /></IconWrapper>
);
export const BellIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.006H16.742a.75.75 0 00.515-1.006A11.43 11.43 0 0116 8a6 6 0 00-6-6zM8.5 16a1.5 1.5 0 103 0h-3z" clipRule="evenodd" /></IconWrapper>
);
export const SortIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M10.25 4.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V4.75z" /><path d="M6.03 6.28a.75.75 0 00-1.06-1.06l-2.25 2.25a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L5.06 8.5l.97-.97zM13.97 13.72a.75.75 0 001.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25a.75.75 0 10-1.06 1.06l.97.97-1.03 1.03z" /></IconWrapper>
);
export const DocumentIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 6a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 016 6zm0 3a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 016 9zm0 3a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z" clipRule="evenodd" /></IconWrapper>
);
export const VideoIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M1.25 5A2.75 2.75 0 014 2.25h9.5A2.75 2.75 0 0116.25 5v1.875a.75.75 0 01-1.5 0V5a1.25 1.25 0 00-1.25-1.25H4A1.25 1.25 0 002.75 5v10A1.25 1.25 0 004 16.25h1.936a.75.75 0 010 1.5H4A2.75 2.75 0 011.25 15V5z" clipRule="evenodd" /><path d="M17.5 9.125a.75.75 0 00-1.06-.05L14 11.053V8.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-2.201l2.44 1.982a.75.75 0 001.06-.998L15.91 11l1.64-1.325a.75.75 0 00-.05-1.06z" /></IconWrapper>
);
export const UserIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.22 5.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm3.22-3.72a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM10 18a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zm3.72-3.22a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 010 1.06zm3.03.22a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-3.22 2.72a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" /><path d="M10 5a5 5 0 100 10 5 5 0 000-10zM8 10a2 2 0 114 0 2 2 0 01-4 0z" /></IconWrapper>
);
export const AgentIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M3.5 3A1.5 1.5 0 015 1.5h1.5a.5.5 0 010 1H5A.5.5 0 004.5 3v10a.5.5 0 00.5.5h1.5a.5.5 0 010 1H5A1.5 1.5 0 013.5 13V3z" /><path d="M15 1.5A1.5 1.5 0 0116.5 3v10a1.5 1.5 0 01-1.5 1.5h-1.5a.5.5 0 010-1H15a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5h-1.5a.5.5 0 010-1H15z" /><path d="M8 4.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zM8 14.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" /><path fillRule="evenodd" d="M3 7.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM3 11.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z" clipRule="evenodd" /></IconWrapper>
);
export const XMarkIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></IconWrapper>
);
export const LinkIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M8.99 4.01a.75.75 0 011.02-.06l5.006 4.006a.75.75 0 010 1.12l-5.006 4.006a.75.75 0 11-.96-1.18L13.25 10l-4.22-3.376a.75.75 0 01-.04-1.06l.001-.001zm-2 0a.75.75 0 01.96 1.18L6.75 10l4.22 3.376a.75.75 0 11-.96 1.18L5.005 10.56a.75.75 0 010-1.12L10.01 5.434a.75.75 0 011.02.06l-5.006-4.005a.75.75 0 01-.06-1.02z" clipRule="evenodd" /></IconWrapper>
);
export const DocumentTextIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.5 5.75a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5zM7.5 12a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z" clipRule="evenodd" /></IconWrapper>
);
export const TrashIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75H4.5a.75.75 0 000 1.5h11a.75.75 0 000-1.5H14A2.75 2.75 0 0011.25 1h-2.5zM10 4c.414 0 .75.336.75.75V15.5a.75.75 0 01-1.5 0V4.75A.75.75 0 0110 4zM2.5 5.5a.75.75 0 00-1.5 0v9.5c0 1.243 1.007 2.25 2.25 2.25h10.5a2.25 2.25 0 002.25-2.25V5.5a.75.75 0 00-1.5 0v9.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75V5.5z" clipRule="evenodd" /></IconWrapper>
);
export const ChatBubbleLeftRightIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10 2c-4.418 0-8 3.134-8 7s3.582 7 8 7c.236 0 .47-.01.701-.029l.01.006a.75.75 0 00.584-.236l2.122-2.121a.75.75 0 000-1.06l-2.121-2.122a.75.75 0 00-1.06 0L10 12.94l-1.182-1.182a.75.75 0 00-1.06 1.061l1.182 1.182a.75.75 0 001.06 0l2.122-2.121a.75.75 0 00-1.06-1.06l-2.122 2.12z" clipRule="evenodd" /><path d="M18.892 13.12a9.548 9.548 0 00-2.38-4.943 7.502 7.502 0 00-1.282-1.176 9.495 9.495 0 00-4.942-2.38C9.522 4.54 8.782 4.5 8 4.5c-2.91 0-5.463 1.67-6.733 4.026a.75.75 0 001.11 1.018A6.002 6.002 0 018 6c.55 0 1.085.06 1.603.175a.75.75 0 00.72-.03l2.22-1.11a.75.75 0 01.97.97l-1.11 2.22a.75.75 0 00.03.72c.116.518.175 1.053.175 1.603 0 1.25-.36 2.42-1.026 3.486a.75.75 0 001.018 1.11A7.49 7.49 0 0015.5 13c.046-1.17.024-2.31-.078-3.42a.75.75 0 01.75-.733c.414 0 .75.336.75.75 0 .017-.005.034-.006.05a8.03 8.03 0 01-.19 1.488z" /></IconWrapper>
);
export const BeakerIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M10.25 2.25a.75.75 0 00-1.5 0V3.32a6.002 6.002 0 00-4.07 4.686l-.053.318-.755 4.53a1.5 1.5 0 00.16 1.29L5.34 16.5a.75.75 0 001.012.353l.975-.487a1.5 1.5 0 011.346 0l.975.487a.75.75 0 001.012-.353l1.208-2.415a1.5 1.5 0 00.16-1.29l-.755-4.53-.053-.318A6.002 6.002 0 0011.25 3.32V2.25zM9.5 5.5a.5.5 0 00-1 0v.25a.5.5 0 001 0V5.5zm1.5 0a.5.5 0 00-1 0v.25a.5.5 0 001 0V5.5zM8 5.5a.5.5 0 01.5-.5h.25a.5.5 0 010 1H8.5a.5.5 0 01-.5-.5zM6.657 9.51l.142-.85h6.402l.142.85A4.502 4.502 0 018.75 14h-2.5a4.502 4.502 0 01-2.406-4.227L3.75 9.51z" clipRule="evenodd" /></IconWrapper>
);

export const UserCircleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" /></IconWrapper>
);
export const Cog6ToothIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path fillRule="evenodd" d="M11.09 3.562A1.75 1.75 0 0114 4.095l.088-.035c.441-.176.953.043 1.13.484l.003.007c.176.441-.044.953-.485 1.13l-.007.003-.088.035a1.75 1.75 0 01-1.094 2.332c-.54.215-.92.735-1.025 1.298l-.003.02a1.75 1.75 0 01-3.116 0l-.003-.02c-.105-.563-.485-1.083-1.025-1.298a1.75 1.75 0 01-1.094-2.332l-.088-.035-.007-.003c-.441-.176-.66-.688-.484-1.13l.007-.003c.176-.441.689-.66 1.13-.484l.035.007.088.035a1.75 1.75 0 012.91-1.627V3.562zM9.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-.75 3.5a.75.75 0 00-1.5 0v1.562a1.75 1.75 0 01-1.094 2.332l-.088.035-.007.003c-.441.176-.953-.044-1.13-.485l-.003-.007a1.75 1.75 0 011.627-2.91l.035-.088a1.75 1.75 0 012.332-1.094c.54.215.92.735 1.025 1.298l.003.02a1.75 1.75 0 01-3.116 0l.003-.02c.105-.563.485-1.083 1.025-1.298z" clipRule="evenodd" /></IconWrapper>
);
export const CreditCardIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M2.25 5.25a3 3 0 013-3h10.5a3 3 0 013 3v.5a.75.75 0 01-1.5 0v-.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-2.5a.75.75 0 011.5 0v2.5a3 3 0 01-3 3H5.25a3 3 0 01-3-3V5.25z" /><path d="M12.75 9a.75.75 0 000 1.5h2.25a.75.75 0 000-1.5H12.75z" /><path fillRule="evenodd" d="M5 8.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM6 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5H6z" clipRule="evenodd" /></IconWrapper>
);
export const UsersIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}><path d="M10.49 4.75a.75.75 0 011.02 0l4.25 4.5a.75.75 0 01-.02 1.06l-4.25 4.5a.75.75 0 01-1.04-1.06L14.19 10l-3.7-3.94a.75.75 0 01-.02-1.06z" /><path d="M5.49 4.75a.75.75 0 011.02 0l4.25 4.5a.75.75 0 01-.02 1.06l-4.25 4.5a.75.75 0 01-1.04-1.06L9.19 10 5.49 6.06a.75.75 0 01-.02-1.06z" /></IconWrapper>
);
