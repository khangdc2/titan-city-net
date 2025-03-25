import type { Quest } from "@types";

export class QuestManager {
  private activeQuest: Quest | null = null;
  private completedQuests: Quest[] = [];

  constructor(private setQuestLogUI?: (quests: Quest[]) => void) {}

  acceptQuest(quest: Quest) {
    if (this.activeQuest && this.activeQuest.id === quest.id) return;

    this.activeQuest = { ...quest };
    this.updateUI();
  }

  completeQuest() {
    if (!this.activeQuest) return;

    this.completedQuests.push({ ...this.activeQuest, completed: true });
    this.activeQuest = null;
    this.updateUI();
  }

  getActive(): Quest | null {
    return this.activeQuest;
  }

  getCompleted(): Quest[] {
    return [...this.completedQuests];
  }

  isCompleted(id: string): boolean {
    return this.completedQuests.some((q) => q.id === id);
  }

  private updateUI() {
    if (this.setQuestLogUI) {
      this.setQuestLogUI(this.getLog());
    }
  }

  getLog(): Quest[] {
    const all: Quest[] = [];
    if (this.activeQuest) all.push(this.activeQuest);
    all.push(...this.completedQuests);
    return all;
  }
}
