/**
 * The tickable checklist at the foot of a lesson.
 *
 * Ticks live in the same key/value workbook store as every other answer, under
 * `check:<lessonId>#<index>` — no table of their own, and no migration when a
 * lesson gains or loses a step. The index is positional, so reordering a
 * lesson's checklist reassigns existing ticks; that is accepted, because the
 * alternative is asking authors to mint stable ids for one-line strings.
 */

export const checklistKey = (lessonId: string, index: number) => `check:${lessonId}#${index}`;

export interface Checklist {
  /** Apply the stored ticks once the session is known. */
  hydrate(workbook: Record<string, string>): void;
}

export function initChecklist(root: ParentNode, lessonId: string): Checklist | null {
  const checklist = root.querySelector<HTMLElement>('[data-checklist]');
  if (!checklist) return null;

  const boxes = Array.from(checklist.querySelectorAll<HTMLInputElement>('input[data-check]'));
  const countEl = checklist.querySelector<HTMLElement>('[data-checklist-count]');

  const paintCount = () => {
    if (!countEl) return;
    const done = boxes.filter((b) => b.checked).length;
    countEl.textContent = done ? `${done} of ${boxes.length} done` : `${boxes.length} things`;
  };

  for (const box of boxes) {
    box.addEventListener('change', async () => {
      // Paint first: the tick is the reader's, whether or not the write lands.
      paintCount();
      try {
        await fetch('/api/workbook', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            workbookKey: checklistKey(lessonId, Number(box.dataset.check)),
            lessonId,
            content: box.checked ? '1' : '',
          }),
        });
      } catch {
        /* Offline. The tick stays on screen; it just is not stored yet. */
      }
    });
  }

  paintCount();

  return {
    hydrate(workbook) {
      for (const box of boxes) {
        box.checked = Boolean(workbook[checklistKey(lessonId, Number(box.dataset.check))]);
      }
      paintCount();
    },
  };
}
