/**
 * The "Mark this lesson done" button.
 *
 * Hidden until the session is known: offering it to a signed-out reader would
 * be a button that silently does nothing. Progress is stored per lesson id, not
 * per URL, so renaming a lesson's file does not lose it.
 */

export interface MarkDone {
  /** Reveal the button and set its state once the session is known. */
  hydrate(progress: Record<string, string>): void;
}

export function initMarkDone(root: ParentNode, lessonId: string): MarkDone | null {
  const button = root.querySelector<HTMLButtonElement>('[data-mark-done]');
  const label = root.querySelector<HTMLElement>('[data-mark-label]');
  if (!button || !label) return null;

  let done = false;

  const paint = () => {
    label.textContent = done ? '✓ Done — tap to undo' : 'Mark this lesson done';
    button.classList.toggle('btn-primary', done);
    button.classList.toggle('btn-ghost', !done);
  };

  button.addEventListener('click', async () => {
    // Optimistic: the toggle is instant, the write catches up.
    done = !done;
    paint();
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lessonId, done }),
      });
    } catch {
      /* Offline. The next load reads the stored value and corrects this. */
    }
  });

  return {
    hydrate(progress) {
      button.hidden = false;
      done = Boolean(progress[lessonId]);
      paint();
    },
  };
}
