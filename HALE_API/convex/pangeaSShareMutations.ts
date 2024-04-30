import { mutation, internalMutation } from "./_generated/server";
import { v } from 'convex/values';
import { Id } from "./_generated/dataModel";

export const deleteById = internalMutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});


