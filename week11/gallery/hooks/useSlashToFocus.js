import { useEffect } from 'react';

// Pressing "/" anywhere (outside a text field) jumps to search — the same shortcut GitHub and YouTube use.
export function useSlashToFocus(inputRef) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (isTyping || document.querySelector('dialog[open]')) return;

      event.preventDefault();
      inputRef.current?.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputRef]);
}
