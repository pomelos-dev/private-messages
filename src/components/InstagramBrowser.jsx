import { useState, useEffect, useRef } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';

/**
 * InstagramBrowser — simulated Instagram with profile browsing, posts, comments, and follow.
 *
 * Props:
 *   profiles        — { username: profileData, ... }
 *   initialProfile  — which username to show first
 *   triggers        — array of event triggers
 *   onEvent         — callback when a trigger fires (trigger) => void
 *   newPostOptions  — optional: if provided, shows a "+" new post button
 *   onNewPost       — callback when a post option is selected
 */
export default function InstagramBrowser({
  profiles: initialProfiles,
  initialProfile,
  triggers = [],
  onEvent,
  newPostOptions,
  onNewPost,
  autoViewPost,   // { profile, postId } — forces browser to open this post
  ownUsername,    // the player's own username — shows "Edit Profile" instead of "Following"
}) {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const goToScreen = useGameStore((s) => s.goToScreen);

  const [profiles, setProfiles] = useState(initialProfiles);
  const profilesRef = useRef(profiles);
  const [currentUsername, setCurrentUsername] = useState(initialProfile);
  const [viewingPost, setViewingPost] = useState(null); // post object or null
  const [firedTriggers, setFiredTriggers] = useState(new Set());
  const [showNewPost, setShowNewPost] = useState(false);

  // Update profiles if parent passes new ones (e.g., adding victorhallberg)
  useEffect(() => {
    setProfiles(initialProfiles);
    profilesRef.current = initialProfiles;
  }, [initialProfiles]);

  // Navigate to a specific post when parent requests it (e.g., after notification tap)
  // Depend on the primitive values to avoid re-firing on every render
  useEffect(() => {
    if (!autoViewPost) return;
    const profileData = profilesRef.current[autoViewPost.profile];
    const post = profileData?.posts.find((p) => p.id === autoViewPost.postId);
    if (post) {
      setCurrentUsername(autoViewPost.profile);
      setViewingPost(post);
      setShowNewPost(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoViewPost?.profile, autoViewPost?.postId]);

  const currentProfile = profiles[currentUsername];

  // ── Trigger system ─────────────────────────────────────────────
  const fireTrigger = (eventType, targetProfile) => {
    triggers.forEach((trigger) => {
      if (firedTriggers.has(trigger.id)) return;
      if (trigger.when !== eventType) return;
      if (trigger.profile && trigger.profile !== targetProfile) return;

      setFiredTriggers((prev) => new Set([...prev, trigger.id]));

      if (trigger.action === 'notification') {
        pushNotification({
          id: trigger.id,
          from: trigger.notification.from,
          avatar: trigger.notification.avatar || null,
          preview: trigger.notification.preview,
          target: trigger.notification.target,
          onTap: trigger.postTarget
            ? () => {
                // Use profilesRef so we always get the latest state (avoids stale closure)
                setCurrentUsername(trigger.postTarget.profile);
                const targetPost = profilesRef.current[trigger.postTarget.profile]?.posts.find(
                  (p) => p.id === trigger.postTarget.postId
                );
                if (targetPost) setViewingPost(targetPost);
              }
            : null,
        });
      }

      if (onEvent) onEvent(trigger);
    });
  };

  // Fire trigger when viewing a profile
  useEffect(() => {
    if (currentUsername && !viewingPost) {
      fireTrigger('view_profile', currentUsername);
    }
  }, [currentUsername]);

  // ── Follow handler ─────────────────────────────────────────────
  const handleFollow = (username) => {
    setProfiles((prev) => ({
      ...prev,
      [username]: { ...prev[username], isFollowing: true },
    }));
    fireTrigger('follow', username);
  };

  // ── Navigate to a profile ──────────────────────────────────────
  const navigateToProfile = (username) => {
    if (profiles[username]) {
      setViewingPost(null);
      setCurrentUsername(username);
    }
  };

  // ── Render username as tappable link ───────────────────────────
  const renderCaption = (caption) => {
    // Split on @mentions and make them tappable
    const parts = caption.split(/(@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        const username = part.slice(1);
        return (
          <button
            key={i}
            onClick={() => navigateToProfile(username)}
            className="text-blue-500 font-medium"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // ── Post view ──────────────────────────────────────────────────
  if (viewingPost) {
    return (
      <div className="flex-1 min-h-0 flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
          <button onClick={() => setViewingPost(null)} className="text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-sm text-black">Post</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Post author */}
          <div className="flex items-center gap-2 px-4 py-3">
            <img
              src={getImage(currentProfile?.avatar)}
              alt=""
              className="w-8 h-8 rounded-full object-cover bg-neutral-200"
            />
            <button
              onClick={() => setViewingPost(null)}
              className="font-semibold text-sm text-black"
            >
              {currentUsername}
            </button>
          </div>

          {/* Post image */}
          {viewingPost.image && (
            <div className="w-full aspect-square bg-neutral-100">
              <img
                src={getImage(viewingPost.image)}
                alt=""
                className={`w-full h-full object-cover ${viewingPost.objectPosition === 'top' ? 'object-top' : ''}`}
                onError={(e) => {
                  e.target.className = 'w-full h-full bg-neutral-200 flex items-center justify-center';
                }}
              />
            </div>
          )}

          {/* Action bar (decorative) */}
          <div className="flex items-center gap-4 px-4 py-3">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </div>

          {/* Caption */}
          <div className="px-4 pb-2">
            <p className="text-sm text-black">
              <span className="font-semibold mr-1">{currentUsername}</span>
              {renderCaption(viewingPost.caption)}
            </p>
          </div>

          {/* Comments */}
          {viewingPost.comments?.length > 0 && (
            <div className="px-4 pb-4 space-y-2">
              {viewingPost.comments.map((comment, i) => (
                <p key={i} className="text-sm text-black">
                  <button
                    onClick={() => navigateToProfile(comment.username)}
                    className="font-semibold mr-1"
                  >
                    {comment.username}
                  </button>
                  {comment.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── New Post picker ────────────────────────────────────────────
  if (showNewPost && newPostOptions) {
    return (
      <div className="flex-1 min-h-0 flex flex-col bg-white">
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
          <button onClick={() => setShowNewPost(false)} className="text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="font-semibold text-sm text-black flex-1 text-center">New Post</span>
          <div className="w-5" />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-5">
          <p className="text-sm text-neutral-500 text-center">Choose what to post:</p>
          {newPostOptions.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                setShowNewPost(false);
                if (onNewPost) onNewPost(option);
              }}
              className="w-[82%] mx-auto block rounded-xl border border-neutral-200 overflow-hidden active:scale-[0.97] transition-transform text-left shadow-sm"
            >
              <div className="aspect-square bg-neutral-100">
                <img
                  src={getImage(option.image)}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.className = 'w-full h-full bg-neutral-200';
                  }}
                />
              </div>
              <p className="px-3 py-2.5 text-sm text-black leading-snug">{option.caption}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Profile view ───────────────────────────────────────────────
  if (!currentProfile) {
    return <div className="flex-1 bg-white flex items-center justify-center text-neutral-400">Profile not found</div>;
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      {/* Instagram header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <span className="pointer-events-none text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </span>
        <span className="font-bold text-lg text-black tracking-tight">Instagram</span>
        {newPostOptions && (
          <button
            onClick={() => setShowNewPost(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile header */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src={getImage(currentProfile.avatar)}
              alt=""
              className="w-20 h-20 rounded-full object-cover bg-neutral-200"
              onError={(e) => {
                e.target.className = 'w-20 h-20 rounded-full bg-neutral-300';
              }}
            />
            <div className="flex-1">
              <h2 className="font-bold text-black">{currentUsername}</h2>
              {currentProfile.displayName && (
                <p className="text-sm text-neutral-500">{currentProfile.displayName}</p>
              )}
              {currentProfile.followers && (
                <p className="text-xs text-neutral-500 mt-0.5">
                  <span className="font-semibold text-black">{currentProfile.followers}</span> followers
                </p>
              )}
              <div className="mt-2">
                {currentUsername === ownUsername ? (
                  <span className="inline-block px-4 py-1.5 rounded-lg bg-neutral-100 text-sm font-medium text-neutral-400 border border-neutral-200">
                    Edit Profile
                  </span>
                ) : currentProfile.isFollowing ? (
                  <span className="inline-block px-4 py-1.5 rounded-lg bg-neutral-200 text-sm font-medium text-neutral-600">
                    Following
                  </span>
                ) : (
                  <button
                    onClick={() => handleFollow(currentUsername)}
                    className="inline-block px-4 py-1.5 rounded-lg bg-blue-500 text-sm font-medium text-white active:bg-blue-600"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          {currentProfile.bio && (
            <p className="text-xs text-black mt-3 leading-relaxed">{currentProfile.bio}</p>
          )}
        </div>

        {/* Posts grid */}
        <div className="border-t border-neutral-200">
          <div className="grid grid-cols-3 gap-0.5">
            {currentProfile.posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setViewingPost(post)}
                className="aspect-square bg-neutral-100 active:opacity-80"
              >
                {post.image ? (
                  <img
                    src={getImage(post.image)}
                    alt=""
                    loading="lazy"
                    className={`w-full h-full object-cover ${post.objectPosition === 'top' ? 'object-top' : ''}`}
                    onError={(e) => {
                      e.target.className = 'w-full h-full bg-neutral-200';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200 flex items-center justify-center p-2">
                    <p className="text-[10px] text-neutral-500 text-center line-clamp-3">
                      {post.caption}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Profile navigation bar — other profiles */}
        <div className="border-t border-neutral-200 px-4 py-3">
          <p className="text-xs text-neutral-400 mb-2">Profiles</p>
          <div className="flex gap-3 overflow-x-auto pb-1 pt-1 pl-1">
            {Object.entries(profiles).map(([username, profile]) => (
              <button
                key={username}
                onClick={() => navigateToProfile(username)}
                className={`flex flex-col items-center gap-1 flex-shrink-0 ${
                  username === currentUsername ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <img
                  src={getImage(profile.avatar)}
                  alt=""
                  loading="lazy"
                  className={`w-12 h-12 rounded-full object-cover bg-neutral-200 ${
                    username === currentUsername ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                  }`}
                  onError={(e) => {
                    e.target.className = 'w-12 h-12 rounded-full bg-neutral-300';
                  }}
                />
                <span className="text-[10px] text-black truncate max-w-[48px]">{username}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
