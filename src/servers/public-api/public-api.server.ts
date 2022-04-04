import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import { BooksController } from '@servers/public-api/books/books.controller';
import { LoansController } from '@servers/public-api/loans/loans.controller';
import { FinesController } from '@servers/public-api/fines/fines.controller';

const { app, logger } = init(
  'Public API',
  [BooksController, LoansController, FinesController],
);

app.listen(config.PUBLIC_API_PORT, async () => {
  try {
  } catch (error) {
    console.error(error);
  }

  logger.success(`Public API is listening on port: ${config.PUBLIC_API_PORT}`, config);
});
