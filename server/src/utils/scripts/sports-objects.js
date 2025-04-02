import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  // Чтение CSV файла
  const results = [];
  fs.createReadStream('./src/utils/csv/data-898-2025-03-14.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Пропускаем заголовки (первые две строки)
      const records = results.slice(2);

      for (const record of records) {
        try {
          // Извлечение координат из geoData
          const geoData = record.geoData;
          const coordinatesMatch = geoData.match(
            /coordinates=\[([\d.]+),\s*([\d.]+)\]/,
          );
          if (!coordinatesMatch) continue;

          const x = parseFloat(coordinatesMatch[1]);
          const y = parseFloat(coordinatesMatch[2]);

          // Создаем Location
          const location = await prisma.location.create({
            data: {
              x,
              y,
            },
          });

          // Создаем SportsObject
          await prisma.sportsObject.create({
            data: {
              global_id: record.global_id,
              locationId: location.id,
              ObjectName: record.ObjectName,
              NameWinter: record.NameWinter,
              AdmArea: record.AdmArea,
              District: record.District,
              Address: record.Address,
              Email: record.Email,
              WebSite: record.WebSite,
              HelpPhone: record.HelpPhone,
              HelpPhoneExtension: record.HelpPhoneExtension,
              WorkingHoursWinter: record.WorkingHoursWinter,
              ClarificationOfWorkingHoursWinter:
                record.ClarificationOfWorkingHoursWinter,
              HasEquipmentRental: record.HasEquipmentRental,
              EquipmentRentalComments: record.EquipmentRentalComments,
              HasTechService: record.HasTechService,
              TechServiceComments: record.TechServiceComments,
              HasDressingRoom: record.HasDressingRoom,
              HasEatery: record.HasEatery,
              HasToilet: record.HasToilet,
              HasWifi: record.HasWifi,
              HasCashMachine: record.HasCashMachine,
              HasFirstAidPost: record.HasFirstAidPost,
              HasMusic: record.HasMusic,
              UsagePeriodWinter: record.UsagePeriodWinter,
              DimensionsWinter: record.DimensionsWinter,
              Lighting: record.Lighting,
              SurfaceTypeWinter: record.SurfaceTypeWinter,
              Seats: record.Seats ? parseInt(record.Seats) : null,
              Paid: record.Paid,
              PaidComments: record.PaidComments,
              DisabilityFriendly: record.DisabilityFriendly,
              ServicesWinter: record.ServicesWinter,
            },
          });

          console.log(`Added sports object with ID: ${record.global_id}`);
        } catch (error) {
          console.error(`Error processing record ${record.global_id}:`, error);
        }
      }

      console.log('Data import completed');
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
