import { NextApiRequest, NextApiResponse } from "next"
import simpleGit from "simple-git"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const git = simpleGit()
  const folder = "/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project"
  switch (req.method) {
    case "GET":
      await git.cwd(folder)
      const branches = await git.branchLocal()
      res.status(200).json({ branches })
      break

    case "POST":
      const { action, name } = req.body
      const origin = "main"
      if (action === "create") {
        const newBranch = name
        await git.cwd(folder)
        try {
          try {
            await git.checkout(origin) // be sure to be on origin
          } catch {
            // init and create main branch if needed
            await git.init()
            await git.add(".")
            await git.commit("Initial commit")
          }
          await git.checkoutLocalBranch(newBranch)
          await git.fetch()
          res
            .status(200)
            .json({
              success: true,
              message: `Created branch '${newBranch}' based on '${origin}'.`,
            })
        } catch (error) {
          res
            .status(200)
            .json({
              success: false,
              message: `Failed to create branch '${newBranch}':`,
              error,
            })
        }
      } else if (action === "delete") {
        const branchToDelete = name;

        await git.cwd(folder);

        try {
          await git.checkout(branchToDelete);
          await git.add(".");
          await git.commit("Commit before delete");
        } catch (e) {
          res.status(400).json({ success: false, message: "No branch to delete." });
          return;
        }

        try {
          await git.checkout(origin);
          await git.deleteLocalBranch(branchToDelete);
          res
            .status(200)
            .json({ success: true, message: `Deleted branch '${branchToDelete}'.` });
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: `Failed to delete branch '${branchToDelete}':`, error });
        }
      } else if (action === "merge") {
        const { sourceBranch, targetBranch } = req.body
        await git.cwd(folder)
        try {
          await git.checkout(targetBranch)
          await git.mergeFromTo(sourceBranch, targetBranch)
          res
            .status(200)
            .json({
              success: true,
              message: `Merged branch '${sourceBranch}' into '${targetBranch}'.`,
            })
        } catch (error) {
          res.status(200).json({
            success: false,
            message: `Failed to merge branch '${sourceBranch}' into '${targetBranch}':`,
            error,
          })
        }
      } else if (action === "compare") {
        const { baseBranch, compareBranch } = req.body
        await git.cwd(folder)
        try {
          const summary = await git.diffSummary([baseBranch, compareBranch])
          const changes = await git.diff([baseBranch, compareBranch])
          res.status(200).json({ success: true, summary: summary, changes: changes })
        } catch (error) {
          res.status(200).json({
            success: false,
            message: `Failed to compare branch '${baseBranch}' with '${compareBranch}':`,
            error,
          })
        }
      } else if (action === "checkout") {
        const { checkoutBranch } = req.body

        await git.cwd(folder)
        await git.add(".")
        await git.commit("Commit before checkout")
        await git.checkout("main")

        try {
          await git.checkout(checkoutBranch)
          const situation = await git.branchLocal();
          res.status(200).json({ success: true, situation: situation })
        }
        catch (e) {
          const situation = await git.branchLocal();
          res.status(400).json({ success: false, situation: situation, error: e })
        }
      } else if (action === "commit") {
        const { name } = req.body
        try {
          await git.add(".")
          await git.commit(name)
          res.status(200).json({ success: true, message: "New commit created" })
        } catch (e) {
          res.status(500).json({ success: false })
        }
      } else {
        res.status(400).json({ success: false, message: "actionNotAllowed" })
      }
  }
}
