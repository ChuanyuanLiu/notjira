import express, {Request, Response} from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

type Issue = {
  id: number
  title: string
  description: string
}

let issues: Issue[] = [
  {id: 1, title: "Issue 1", description: "Description for issue 1"},
  {id: 2, title: "Issue 2", description: "Description for issue 2"},
  {id: 3, title: "Issue 3", description: "Description for issue 3"},
]

// Read all issues
app.get("/issues", (req: Request, res: Response) => {
  res.json(issues)
})

// Read a single issue
app.get("/issues/:id", (req: Request, res: Response) => {
  const issue = issues.find((i) => i.id === parseInt(req.params.id))
  if (!issue) return res.status(404).send("Issue not found")
  res.json(issue)
})

// Create a new issue
app.post("/issues", (req: Request, res: Response) => {
  const newIssue: Issue = {
    id: issues.length + 1,
    title: req.body.title,
    description: req.body.description,
  }
  issues.push(newIssue)
  res.status(201).json(newIssue)
})

// Update an issue
app.put("/issues/:id", (req: Request, res: Response) => {
  const issue = issues.find((i) => i.id === parseInt(req.params.id))
  if (!issue) return res.status(404).send("Issue not found")

  issue.title = req.body.title
  issue.description = req.body.description
  res.json(issue)
})

// Delete an issue
app.delete("/issues/:id", (req: Request, res: Response) => {
  const issueIndex = issues.findIndex((i) => i.id === parseInt(req.params.id))
  if (issueIndex === -1) return res.status(404).send("Issue not found")

  const deletedIssue = issues.splice(issueIndex, 1)
  res.json(deletedIssue)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
