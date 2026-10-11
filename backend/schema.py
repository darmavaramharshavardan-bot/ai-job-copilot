 # Shared Pydantic schema reused by main endpoint and isolated Gemini tests.
# Import this file rather than duplicating the classes.
from pydantic import BaseModel, Field

class SkillTopic(BaseModel):
    topic: str

class PracticalExercise(BaseModel):
    exercise: str

class CompletionOutcome(BaseModel):
    outcome: str

class DetailedSkillRecommendation(BaseModel):
    priority: int
    title: str
    reason: str
    topics_to_learn: list[SkillTopic] = Field(default_factory=list)
    practical_exercises: list[PracticalExercise] = Field(default_factory=list)
    completion_outcome: CompletionOutcome | None = None

class ProjectKeyFeature(BaseModel):
    feature: str

class TechStack(BaseModel):
    stack: str

class SkillDemonstrated(BaseModel):
    skill: str

class RelevanceToRole(BaseModel):
    relevance: str

class DetailedProjectRecommendation(BaseModel):
    priority: int
    title: str
    problem: str
    key_features: list[ProjectKeyFeature] = Field(default_factory=list)
    tech_stack: TechStack | None = None
    skills_demonstrated: list[SkillDemonstrated] = Field(default_factory=list)
    relevance_to_role: RelevanceToRole | None = None

class ResumeAnalysis(BaseModel):
    match_score: int
    matching_skills: list[str]
    missing_skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    skills_to_learn: list[DetailedSkillRecommendation]
    projects_to_build: list[DetailedProjectRecommendation]
